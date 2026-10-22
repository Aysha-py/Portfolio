"use client";

import { useLayoutEffect, useReducer, useRef } from "react";

const THEME_KEY = "aishah-theme";

type Logic = {
  props: Record<string, unknown>;
  state: Record<string, unknown>;
  _notify: (() => void) | null;
  _themeBound?: boolean;
  setState: (patch: Record<string, unknown>) => void;
  renderVals: () => Record<string, any>;
};

// Runs a page's logic class and returns the values its markup reads (`h.theme`, `h.toggleMenu`, ...).
export function useDC(Cls: new () => unknown, defaults: Record<string, unknown>) {
  const ref = useRef<Logic | null>(null);
  const [, rerender] = useReducer((n: number) => n + 1, 0);

  if (!ref.current) {
    const logic = new Cls() as Logic;
    logic.props = { ...defaults };
    // The server and the first browser render both start in light mode so the HTML matches;
    // the saved theme is applied straight after (see the layout effect below).
    logic.state = { theme: (defaults.theme as string) || "light" };
    // Listeners, the ripple cursor and scroll helpers only make sense in the browser.
    if (typeof window === "undefined") logic._themeBound = true;
    ref.current = logic;
  }
  const logic = ref.current;
  logic._notify = rerender;

  useLayoutEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") logic.setState({ theme: saved });
    } catch {
      /* storage can be blocked; the page stays in its default theme */
    }
  }, [logic]);

  return logic.renderVals();
}
