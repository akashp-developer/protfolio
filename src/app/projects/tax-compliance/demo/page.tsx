import type { Metadata } from "next";
import { PageIntro, TextLink } from "@/components/ui";
import { TaxDashboard } from "./tax-dashboard";

export const metadata: Metadata = {
  title: "Adaptive Tax Law Monitoring Demo",
  description:
    "Explore a sample compliance workflow, from finding updates to reviewing alerts.",
  alternates: { canonical: "/projects/tax-compliance/demo" },
};

export default function TaxComplianceDemoPage() {
  return (
    <>
      <PageIntro
        label="Interactive demo"
        title="Adaptive Tax Law Monitoring"
        description="Explore a compliance review workflow with fictional updates. Review status lasts for the current visit."
      />
      <div className="container page-body">
        <TextLink href="/projects/tax-compliance">Back to case study</TextLink>
        <TaxDashboard />
      </div>
    </>
  );
}
