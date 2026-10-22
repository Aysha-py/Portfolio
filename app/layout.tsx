import type { Metadata } from "next";
import "@fontsource-variable/figtree";
import "@fontsource/ibm-plex-mono/500.css";

const description =
  "Aishat Muhammed is a content marketer and community manager who helps brands make complex ideas easier to understand through audience-focused content, research, and storytelling.";

export const metadata: Metadata = {
  title: {
    default: "Aishat Muhammed · Content marketer",
    template: "%s · Aishat Muhammed",
  },
  description,
  openGraph: {
    title: "Aishat Muhammed · Content marketer",
    description,
    type: "website",
  },
};

// Page openings ripple out from where you clicked. Each page's CSS opts in to cross-document view
// transitions and draws the ripple from --vt-x / --vt-y; this remembers the click on the page you
// leave and hands it to the page you arrive on before its first frame. Browsers without view
// transitions simply load the page as before.
const pageRipple = `(function () {
  try {
    var KEY = "aishah-page-ripple";
    addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || a.target === "_blank" || a.origin !== location.origin || a.hash && a.pathname === location.pathname) return;
      try { sessionStorage.setItem(KEY, JSON.stringify({ x: e.clientX, y: e.clientY, t: Date.now() })); } catch (err) {}
    }, true);
    addEventListener("pagereveal", function (e) {
      if (!e.viewTransition) return;
      var at = null;
      try { at = JSON.parse(sessionStorage.getItem(KEY) || "null"); sessionStorage.removeItem(KEY); } catch (err) {}
      if (!at || Date.now() - at.t > 5000) return;
      var style = document.createElement("style");
      style.textContent = ":root{--vt-x:" + Math.round(at.x) + "px;--vt-y:" + Math.round(at.y) + "px;}";
      document.head.appendChild(style);
    });
  } catch (err) {}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: pageRipple }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
