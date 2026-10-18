import { site } from "@/content/site";
import SectionHead from "./SectionHead";

type Props = { index: number; total: number };

// Only shows when you've added real quotes in content/site.ts.
export default function Testimonials({ index, total }: Props) {
  if (site.testimonials.length === 0) return null;

  return (
    <section id="kind-words" className="section" aria-labelledby="kind-words-title">
      <SectionHead
        id="kind-words-title"
        index={index}
        total={total}
        label="Kind words"
        title={site.headings.testimonials}
      />
      <div className="quotes">
        {site.testimonials.map((t) => (
          <figure key={t.name} className="box quote">
            <blockquote>
              <p>{t.quote}</p>
            </blockquote>
            <figcaption>
              <strong>{t.name}</strong>
              <span>{t.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
