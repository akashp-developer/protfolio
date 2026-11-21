"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import type { Project, Skill } from "@/data/portfolio";
import { ProjectGrid } from "./projects";
import { SkillCards } from "./ui";

export function ProjectArchive({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [technology, setTechnology] = useState("");
  const categories = [...new Set(projects.map((project) => project.category))].sort();
  const technologies = [...new Set(projects.flatMap((project) => project.technologies))].sort();
  const search = query.trim().toLowerCase();
  const results = projects.filter(
    (project) =>
      (!category || project.category === category) &&
      (!technology || project.technologies.includes(technology)) &&
      [project.title, project.summary, project.category, ...project.technologies]
        .join(" ")
        .toLowerCase()
        .includes(search),
  );
  return (
    <>
      <div className="filter-bar">
        <label className="field search-field">
          Search projects
          <span>
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, topic or technology"
            />
          </span>
        </label>
        <label className="field">
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">All categories</option>
            {categories.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Technology
          <select value={technology} onChange={(event) => setTechnology(event.target.value)}>
            <option value="">All technologies</option>
            {technologies.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="filter-summary">
        <p role="status">
          {results.length} {results.length === 1 ? "project" : "projects"}
        </p>
        {(query || category || technology) && (
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
              setCategory("");
              setTechnology("");
            }}
          >
            Clear filters
          </button>
        )}
      </div>
      {results.length ? (
        <ProjectGrid projects={results} allProjects={projects} />
      ) : (
        <p className="empty">No projects match those filters.</p>
      )}
    </>
  );
}

export function SkillExplorer({ skills }: { skills: Skill[] }) {
  const [category, setCategory] = useState("");
  const categories = ["", ...new Set(skills.map((skill) => skill.category))];
  return (
    <>
      <div className="chip-row" role="group" aria-label="Filter skills by category">
        {categories.map((value) => (
          <button
            className="chip"
            key={value}
            aria-pressed={category === value}
            onClick={() => setCategory(value)}
          >
            {value || "All"}
          </button>
        ))}
      </div>
      <SkillCards
        skills={category ? skills.filter((skill) => skill.category === category) : skills}
      />
    </>
  );
}
