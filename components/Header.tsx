"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

export default function Header() {
  const [active, setActive] = useState<string | null>(null);

  // Underline the link for whichever section is in the middle of the screen.
  useEffect(() => {
    const sections = ["start-here", ...nav.map((n) => n.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#start-here">
          {site.status && <span className="live-dot" aria-hidden="true" />}
          {site.name}
        </a>

        <nav className="site-nav" aria-label="Sections">
          <ul>
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} aria-current={active === n.id ? "location" : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--outline btn--small" href={`mailto:${site.email}`}>
          Email me
        </a>
      </div>
    </header>
  );
}
