import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Writing from "@/components/Writing";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { nav, site } from "@/content/site";

export default function Home() {
  // Numbers the "[ 01 / 05 ]" labels; Kind words only counts once it has quotes.
  const order = ["work", "writing", "experience", ...(site.testimonials.length ? ["kind-words"] : []), "say-hello"];
  const n = (id: string) => ({ index: order.indexOf(id) + 1, total: order.length });

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="backdrop" aria-hidden="true" />
      <Header />
      <main id="main" className="container">
        <Hero />
        <Work {...n("work")} />
        <Writing {...n("writing")} />
        <Experience {...n("experience")} />
        <Testimonials {...n("kind-words")} />
        <Contact {...n("say-hello")} />
      </main>
      <footer className="container footer">
        <ul className="footer__nav">
          {nav.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`}>{l.label}</a>
            </li>
          ))}
          <li>
            <a href={site.resumeFile} download>
              Resume (PDF)
            </a>
          </li>
        </ul>
        <div className="footer__base">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <a href="#start-here">Back to top</a>
        </div>
      </footer>
    </>
  );
}
