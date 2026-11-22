import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/services",
  "/skills",
  "/works",
  "/projects",
  "/projects/custom-my-gold",
  "/projects/ambulance-dispatch",
  "/projects/tax-compliance",
  "/experience",
  "/about",
  "/resume",
  "/contact",
  "/robots.txt",
  "/sitemap.xml",
];

test("production routes and internal links resolve without browser errors", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  const internal = new Set<string>();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const route of routes) {
    if (route.endsWith(".txt") || route.endsWith(".xml")) {
      expect((await request.get(route)).ok(), route).toBeTruthy();
      continue;
    }
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const links = await page
      .locator("a[href]")
      .evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href") ?? ""));
    for (const link of links) {
      if (link.startsWith("#"))
        await expect(page.locator(`[id="${link.slice(1)}"]`)).toHaveCount(1);
      if (link.startsWith("/")) internal.add(link);
    }
  }
  for (const link of internal) expect((await request.get(link)).ok(), link).toBeTruthy();
  expect(errors).toEqual([]);
  expect((await request.get("/page-that-does-not-exist")).status()).toBe(404);
  await page.goto("/projects/not-a-project");
  await expect(page.getByRole("heading", { name: "Page not found." })).toBeVisible();
  await page.getByRole("link", { name: "Return home" }).click();
  await expect(page).toHaveURL("/");
});

test("archive, skills, services, timeline and process controls work", async ({ page }) => {
  await page.goto("/projects");
  await page.getByLabel("Search projects").fill("ambulance");
  await expect(page.getByRole("status")).toHaveText("1 project");
  await page.getByLabel("Technology").selectOption("React");
  await expect(page.getByText("No projects match")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByLabel("Category").selectOption("Full stack");
  await page.getByRole("link", { name: "Case study", exact: true }).click();
  await expect(page).toHaveURL("/projects/tax-compliance");

  await page.goto("/works");
  await page.getByRole("button", { name: "Operations", exact: true }).click();
  await expect(page.locator(".works-row")).toHaveCount(1);
  await expect(page.locator(".works-row")).toContainText("Smart Ambulance Allocation");

  await page.goto("/skills");
  await page.getByRole("button", { name: "Databases", exact: true }).click();
  await page.locator("summary").filter({ hasText: "Data storage" }).click();
  await expect(page.getByText("SQLite", { exact: true })).toBeVisible();

  await page.goto("/services");
  await expect(page.getByText("Mobile-first layouts")).toBeVisible();
  await page.goto("/");
  await page.locator("#service-1 summary").click();
  await expect(
    page.locator("#service-1").getByText("Tailwind CSS", { exact: true }),
  ).toBeVisible();

  await page.goto("/experience");
  await page.locator("summary").filter({ hasText: "B.Tech in Information Technology" }).click();
  await expect(page.getByText("CGPA 7.8 / 10")).toBeVisible();

  await page.goto("/");
  await page.getByRole("button", { name: "Integrate", exact: true }).click();
  await expect(page.locator("#process-description")).toContainText("representative data");
  const pause = page.getByRole("button", { name: "Pause Project technologies" });
  await pause.click();
  await expect(page.getByRole("button", { name: "Play Project technologies" })).toBeVisible();
});

test("mobile navigation, keyboard focus and reduced motion work without overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const menu = page.locator(".mobile-nav summary");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  expect(
    await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior),
  ).toBe("auto");
  await expect(page.getByRole("button", { name: "Pause Project technologies" })).toBeHidden();

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/works",
      "/projects",
      "/projects/ambulance-dispatch",
      "/resume",
      "/contact",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${route} at ${width}px`,
      ).toBeTruthy();
    }
  }
});

test("resume PDF is downloadable and embedded", async ({ page, request }) => {
  await page.goto("/resume");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download PDF" }).click();
  expect((await downloadPromise).suggestedFilename()).toBe("akash-p-resume.pdf");
  const viewer = page.getByTitle("Akash P resume PDF");
  await expect(viewer).toHaveAttribute("src", "/resume/akash-p-resume.pdf");
  const pdf = await request.get("/resume/akash-p-resume.pdf");
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("contact validates in the browser and handles success and error responses", async ({
  page,
}) => {
  await page.goto("/contact");
  const send = page.getByRole("button", { name: "Send message" });
  await send.click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  const fill = async () => {
    await page.getByLabel("Name", { exact: true }).fill("Test Sender");
    await page.getByLabel("Email address").fill("sender@example.test");
    await page.getByLabel("Subject").selectOption("Other inquiry");
    await page
      .getByLabel("Message", { exact: true })
      .fill("This message is intercepted by the test runner.");
  };
  await page.route("**/api/contact", async (route) => {
    expect(route.request().postDataJSON().name).toBe("Test Sender");
    await route.fulfill({ status: 200, json: { message: "Thanks. Your message was sent." } });
  });
  await fill();
  await send.click();
  await expect(
    page.getByRole("status").filter({ hasText: "Your message was sent" }),
  ).toBeVisible();
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("");

  await page.unroute("**/api/contact");
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 429,
      json: { message: "Too many messages. Please try again later." },
    });
  });
  await fill();
  await send.click();
  await expect(page.locator("form").getByRole("alert")).toHaveText(
    "Too many messages. Please try again later.",
  );
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("Test Sender");
});

test("contact endpoint rejects invalid, cross-origin and oversized requests", async ({
  request,
}) => {
  const data = {
    name: "Test Sender",
    email: "sender@example.test",
    subject: "Hello",
    message: "A fixture that never sends an email.",
  };
  expect((await request.post("/api/contact", { data: {} })).status()).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        data,
        headers: { Origin: "https://external.example" },
      })
    ).status(),
  ).toBe(403);
  expect((await request.post("/api/contact", { data: "text" })).status()).toBe(415);
  expect(
    (
      await request.post("/api/contact", { data: { ...data, message: "x".repeat(25_000) } })
    ).status(),
  ).toBe(400);
  expect(
    (await request.post("/api/contact", { data: { ...data, website: "bot trap" } })).status(),
  ).toBe(200);
});
