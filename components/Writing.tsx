import { site } from "@/content/site";
import SectionHead from "./SectionHead";

type Props = { index: number; total: number };

export default function Writing({ index, total }: Props) {
  const outlets = [...new Set(site.writing.map((w) => w.outlet))];
  return (
    <section id="writing" className="section" aria-labelledby="writing-title">
      <SectionHead id="writing-title" index={index} total={total} label="Writing" title={site.headings.writing} />
      <p className="section__lede">
        <span className="mono-label">Published on</span> {outlets.join(", ")}
      </p>

      <ul className="pieces">
        {site.writing.map((w) => (
          <li key={w.title}>
            <a className="piece" href={w.href} target="_blank" rel="noreferrer">
              <span className="piece__meta">
                <span>
                  {w.kind} · {w.year}
                </span>
                <span>{w.outlet}</span>
              </span>
              <span className="piece__title">{w.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
