"use client";

import { useEffect, useMemo, useState } from "react";

import { ThreadTile } from "@/app/work/hub-primitives";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function normalizeColumns(columns) {
  if (!Array.isArray(columns)) return [];
  return columns
    .filter(Boolean)
    .map((col) => ({
      id: col.id,
      title: col.title,
      items: Array.isArray(col.items) ? col.items.filter(Boolean) : [],
    }))
    .filter((col) => col.id && col.title && col.items.length > 0);
}

export function RotatingThreeColumnRow({ columns, intervalMs = 7000 }) {
  const safeColumns = useMemo(() => normalizeColumns(columns), [columns]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (safeColumns.length === 0) return;
    if (prefersReducedMotion()) return;

    const interval = window.setInterval(() => {
      setTick((t) => t + 1);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs, safeColumns.length]);

  if (safeColumns.length === 0) return null;

  return (
    <section className="work-hub-section photography-rotating-row" aria-label="Latest writing and projects">
      <header className="work-hub-section__header">
        <h2 className="work-hub-section__title">Writing, field notes, projects</h2>
        <p className="work-hub-section__intro">
          Rotating selections across the archive — essays, notes, and studio work connected to photography.
        </p>
      </header>

      <div className="photography-rotating-row__grid">
        {safeColumns.map((col, idx) => {
          const offset = idx * 2;
          const active = col.items[(tick + offset) % col.items.length];

          return (
            <div key={col.id} className="photography-rotating-row__col">
              <h3 className="work-hub-section__group-title">{col.title}</h3>
              <div className="photography-rotating-row__card">
                <ThreadTile item={active} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

