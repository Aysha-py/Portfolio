import { site } from "@/content/site";

function Body() {
  const { body, emphasis } = site.hero;
  const at = emphasis ? body.indexOf(emphasis) : -1;
  if (at === -1) return <p className="hero__body">{body}</p>;
  return (
    <p className="hero__body">
      {body.slice(0, at)}
      <strong className="accent">{emphasis}</strong>
      {body.slice(at + emphasis.length)}
    </p>
  );
}

export default function Hero() {
  return (
    <section id="start-here" className="hero" aria-labelledby="hero-title">
      <div className="hero__top">
        <div className="hero__intro">
          <p className="eyebrow eyebrow--status">
            {site.status && <span className="live-dot" aria-hidden="true" />}
            {[site.status, site.location].filter(Boolean).join("  ·  ")}
          </p>
          <h1 id="hero-title" className="hero__name">
            {site.name}
          </h1>
          <p className="hero__role">{site.role}</p>
          <Body />
          <div className="hero__actions">
            <a className="btn btn--primary" href={`mailto:${site.email}`}>
              Email me
            </a>
            <a className="btn btn--outline" href={site.resumeFile} download>
              <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
                <path
                  d="M4 1.5h5L12.5 5v9.5h-8.5zM9 1.5V5h3.5M6.5 8.5h4M6.5 11h4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
              Resume (PDF)
            </a>
          </div>
        </div>

        <div className="portrait" aria-hidden={site.photo ? undefined : true}>
          {site.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={site.photo} alt={`Photo of ${site.name}`} />
          ) : (
            <span>{site.initials}</span>
          )}
        </div>
      </div>

      <ol className="focus" aria-label="Highlights">
        {site.highlights.map((h, i) => (
          <li key={h.channel} className="box focus__card">
            <p className="focus__num">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="focus__title">{h.channel}</h2>
            <p className="focus__text">{h.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
