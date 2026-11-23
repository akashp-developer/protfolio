"use client";

import { useState } from "react";
import { Bell, Check, ChevronDown, FileText, ListChecks } from "lucide-react";
import styles from "./tax-dashboard.module.css";

const sampleUpdates = [
  {
    id: "quarterly-checklist",
    title: "Quarterly reporting checklist",
    category: "Reporting",
    priority: "High",
    summary: "A sample checklist groups the documents needed for a quarterly review.",
    action:
      "Assign a reviewer and compare the sample checklist with the current internal process.",
  },
  {
    id: "invoice-template",
    title: "Invoice template revision",
    category: "Documentation",
    priority: "Medium",
    summary:
      "An example template flags fields that need to be checked before it can be adopted.",
    action: "Review a test invoice and record which fields would need to change.",
  },
  {
    id: "filing-calendar",
    title: "Filing calendar draft",
    category: "Reporting",
    priority: "High",
    summary: "A fictional filing calendar has entries waiting for team review.",
    action: "Assign an owner to each example entry and flag scheduling conflicts.",
  },
  {
    id: "retention-checklist",
    title: "Record retention checklist",
    category: "Records",
    priority: "Low",
    summary: "An internal practice exercise identifies sample records that need an owner.",
    action: "Pick a sample record and confirm which team would maintain it.",
  },
] as const;

export function TaxDashboard() {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("");
  const [unreviewedOnly, setUnreviewedOnly] = useState(false);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const search = query.trim().toLowerCase();
  const visible = sampleUpdates.filter(
    (update) =>
      (!priority || update.priority === priority) &&
      (!unreviewedOnly || !reviewed.includes(update.id)) &&
      `${update.title} ${update.category} ${update.summary}`.toLowerCase().includes(search),
  );
  const alerts = sampleUpdates.filter(
    (update) => update.priority === "High" && !reviewed.includes(update.id),
  ).length;
  const metrics = [
    { title: "Sample updates", count: sampleUpdates.length, Icon: FileText },
    { title: "High-priority alerts", count: alerts, Icon: Bell },
    { title: "Reviewed", count: reviewed.length, Icon: ListChecks },
  ];

  return (
    <section className={styles.dashboard} aria-labelledby="updates-heading">
      <dl className={styles.metrics} aria-live="polite">
        {metrics.map(({ title, count, Icon }) => (
          <div key={title} className={styles.metric}>
            <dt>
              <Icon size={17} aria-hidden="true" /> {title}
            </dt>
            <dd>{count}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.panel}>
        <h2 id="updates-heading">Update feed</h2>
        <div className={styles.filters}>
          <label className="field">
            Search updates
            <input
              type="search"
              placeholder="Title, category, or keyword"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="field">
            <label htmlFor="tax-demo-priority">Priority</label>
            <select
              id="tax-demo-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="">All priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={unreviewedOnly}
              onChange={(event) => setUnreviewedOnly(event.target.checked)}
            />
            Unreviewed only
          </label>
        </div>
        <p role="status">
          {visible.length === 0
            ? "No updates match your filters."
            : `${visible.length} ${visible.length === 1 ? "update" : "updates"}`}
        </p>
        <div className={styles.feed}>
          {visible.map((update) => {
            const isReviewed = reviewed.includes(update.id);
            return (
              <details key={update.id} className={styles.update}>
                <summary>
                  <span>
                    <strong>{update.title}</strong>
                    <small>{update.category}</small>
                  </span>
                  <span className={styles.updateStatus}>
                    <span data-priority={update.priority} className={styles.priority}>
                      {update.priority} priority
                    </span>
                    {isReviewed && (
                      <span className={styles.reviewed}>
                        <Check size={16} aria-hidden="true" /> Reviewed
                      </span>
                    )}
                    <ChevronDown size={17} className={styles.chevron} aria-hidden="true" />
                  </span>
                </summary>
                <div className={styles.details}>
                  <p>{update.summary}</p>
                  <p>
                    <strong>Review action.</strong> {update.action}
                  </p>
                  <button
                    type="button"
                    className="button button-outline"
                    onClick={() =>
                      setReviewed((items) =>
                        items.includes(update.id)
                          ? items.filter((id) => id !== update.id)
                          : [...items, update.id],
                      )
                    }
                  >
                    {isReviewed ? "Mark as unreviewed" : "Mark as reviewed"}
                  </button>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
