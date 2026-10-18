import { site } from "@/content/site";
import SectionHead from "./SectionHead";

type Props = { index: number; total: number };

export default function Experience({ index, total }: Props) {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <SectionHead
        id="experience-title"
        index={index}
        total={total}
        label="Experience"
        title={site.headings.experience}
      />

      <ol className="jobs">
        {site.experience.map((j) => (
          <li key={`${j.role}-${j.org}`} className="job">
            <div>
              <h3 className="job__role">{j.role}</h3>
              <p className="job__summary">{j.summary}</p>
            </div>
            <p className="job__org">{j.org}</p>
            <p className="job__dates">
              {j.start}–{j.end}
            </p>
          </li>
        ))}
      </ol>

      <h3 className="mono-label skills__label">Skills and tools · {site.skills.length}</h3>
      <div className="skills">
        {site.skills.map((s) => (
          <div key={s.group} className="box skills__group">
            <h4>{s.group}</h4>
            <ul>
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
