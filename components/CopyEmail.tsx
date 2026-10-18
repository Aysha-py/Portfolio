"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; the address is still visible to copy by hand.
    }
  }

  return (
    <span className="copy-email">
      <a href={`mailto:${email}`}>{email}</a>
      <button type="button" onClick={copy} aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </button>
    </span>
  );
}
