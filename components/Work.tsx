import { site } from "@/content/site";
import SectionHead from "./SectionHead";

type Props = { index: number; total: number };

export default function Work({ index, total }: Props) {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <SectionHead id="work-title" index={index} total={total} label="Work" title={site.headings.work} />

      <div className="cases">
        {site.work.map((c, i) => (
          <article key={c.title} className="box case">
            <div className="case__side">
              <p className="tag">[ Case {String(i + 1).padStart(2, "0")} ]</p>
              <h3 className="case__title">{c.title}</h3>
              <p className="case__meta">
                {c.org} · {c.role} · {c.year}
              </p>
              {c.results.length > 0 && (
                <dl className="case__results">
                  {c.results.map((r) => (
                    <div key={r.label} className="result">
                      <dt>{r.label}</dt>
                      <dd>{r.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className="case__body">
              <p className="case__summary">{c.summary}</p>
              <h4 className="mono-label">What I did</h4>
              <ul className="case__did">
                {c.did.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              {c.link && (
                <a className="text-link" href={c.link.href}>
                  {c.link.label} <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
