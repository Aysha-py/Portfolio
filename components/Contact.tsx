import { site } from "@/content/site";
import SectionHead from "./SectionHead";
import CopyEmail from "./CopyEmail";

type Props = { index: number; total: number };

export default function Contact({ index, total }: Props) {
  return (
    <section id="say-hello" className="section" aria-labelledby="contact-title">
      <SectionHead id="contact-title" index={index} total={total} label="Contact" title={site.contact.heading} />

      <div className="box contact">
        <p className="contact__body">{site.contact.body}</p>
        <div className="contact__actions">
          <a className="btn btn--primary" href={`mailto:${site.email}`}>
            Email me
          </a>
          <CopyEmail email={site.email} />
        </div>
        <ul className="chips">
          {site.links.map((l) => (
            <li key={l.label}>
              <a className="chip" href={l.href} target="_blank" rel="noreferrer">
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
          <li>
            <a className="chip" href={site.resumeFile} download>
              Resume (PDF)
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
