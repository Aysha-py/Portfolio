#!/usr/bin/env python3
"""Turn the design canvas pages in design/*.dc.html into the Next.js site.

For each page it writes:
  components/views/<Name>View.tsx   the page markup as JSX
  components/logic/<name>.js        the page's behaviour (theme, menu, scrollers, ...)
  app/<route>/page.css              the page's styles

Run it from the repo root after updating anything in design/:
    python3 scripts/import_design.py
"""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DESIGN = ROOT / "design"

PAGES = [
    # design file, view component, logic module, app route folder ("" is the home page)
    ("Home", "HomeView", "home", ""),
    ("About", "AboutView", "about", "about"),
    ("Work", "WorkView", "work", "work"),
    ("TalkShelf", "TalkShelfView", "talkShelf", "talk-shelf"),
    ("OpenTabs", "OpenTabsView", "openTabs", "open-tabs"),
    ("Contact", "ContactView", "contact", "contact"),
]
ROUTES = {name: ("/" + route + "/" if route else "/") for name, _, _, route in PAGES}

IMAGES = json.loads((DESIGN / "images.json").read_text())

VOID = {"img", "br", "hr", "input", "meta", "link", "source", "area", "col", "embed", "param", "track", "wbr"}
INLINE = {"a", "span", "em", "strong", "b", "i", "svg", "img", "button", "code", "small", "sup", "sub", "label", "br"}

ATTR_NAMES = {
    "class": "className", "for": "htmlFor", "tabindex": "tabIndex", "viewbox": "viewBox",
    "stroke-width": "strokeWidth", "stroke-linecap": "strokeLinecap", "stroke-linejoin": "strokeLinejoin",
    "stroke-dasharray": "strokeDasharray", "fill-rule": "fillRule", "clip-rule": "clipRule",
    "onclick": "onClick", "onfocus": "onFocus", "onmouseenter": "onMouseEnter", "onmouseleave": "onMouseLeave",
    "onpointerdown": "onPointerDown", "onpointerup": "onPointerUp", "onpointercancel": "onPointerCancel",
    "onkeydown": "onKeyDown", "onchange": "onChange", "oninput": "onInput", "readonly": "readOnly",
    "autocomplete": "autoComplete", "srcset": "srcSet", "crossorigin": "crossOrigin", "xlink:href": "xlinkHref",
    "preserveaspectratio": "preserveAspectRatio", "gradientunits": "gradientUnits", "stop-color": "stopColor",
}
HOLE = re.compile(r"\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}")


class Node:
    def __init__(self, tag, attrs):
        self.tag, self.attrs, self.children = tag, attrs, []


class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#root", [])
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.stack[-1].children.append(Node(tag, attrs))

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def map_link(value):
    """Design-canvas file links become site routes; /_blob/ images become /images/ files."""
    m = re.fullmatch(r"([A-Za-z]+)\.dc\.html(#.*)?", value)
    if m and m.group(1) in ROUTES:
        return "${BASE}" + ROUTES[m.group(1)] + (m.group(2) or ""), True
    m = re.fullmatch(r"/_blob/([0-9a-f]{32})", value)
    if m:
        name = IMAGES.get(m.group(1))
        if not name:
            sys.exit(f"Image {m.group(1)} is not listed in design/images.json")
        return "${BASE}/images/" + name, True
    return value, False


def js_str(s):
    return json.dumps(s, ensure_ascii=False)


def template(value):
    """Attribute text that contains {{holes}} becomes a JS template literal."""
    out = value.replace("\\", "\\\\").replace("`", "\\`")
    out = HOLE.sub(lambda m: "${h." + m.group(1) + "}", out)
    return "`" + out + "`"


def camel(prop):
    if prop.startswith("--"):
        return js_str(prop)
    parts = prop.split("-")
    if parts[0] == "":  # vendor prefix like -webkit-
        parts = parts[1:]
        parts[0] = parts[0].capitalize() if parts[0] != "ms" else parts[0]
    return parts[0] + "".join(p.capitalize() for p in parts[1:])


def style_attr(value):
    items = []
    for decl in re.split(r";(?![^(]*\))", value):
        if ":" not in decl:
            continue
        prop, val = decl.split(":", 1)
        prop, val = prop.strip(), val.strip()
        if not prop:
            continue
        val = val.replace("Figtree,", '"Figtree Variable",Figtree,')
        v = template(val) if HOLE.search(val) else js_str(val)
        items.append(f"{camel(prop)}: {v}")
    return "style={{" + ", ".join(items) + "} as React.CSSProperties}"


def attr(name, value):
    jname = ATTR_NAMES.get(name, name)
    if value is None:
        return jname
    if name == "style":
        return style_attr(value)
    full = HOLE.fullmatch(value.strip())
    if full:
        return f"{jname}={{h.{full.group(1)}}}"
    if HOLE.search(value):
        return f"{jname}={{{template(value)}}}"
    if name in ("href", "src"):
        mapped, changed = map_link(value)
        if changed:
            return f"{jname}={{`{mapped}`}}"
    if jname == "tabIndex" and re.fullmatch(r"-?\d+", value):
        return f"{jname}={{{value}}}"
    if re.search(r'["\\{}&<>]', value):
        return f"{jname}={{{js_str(value)}}}"
    return f'{jname}="{value}"'


def text_jsx(s):
    parts = []
    pos = 0
    for m in HOLE.finditer(s):
        parts.append(escape_text(s[pos:m.start()]))
        parts.append("{h." + m.group(1) + "}")
        pos = m.end()
    parts.append(escape_text(s[pos:]))
    return "".join(parts)


def escape_text(s):
    s = re.sub(r"\s+", " ", s)
    return re.sub(r"[{}<>&]", lambda m: "{" + js_str(m.group(0)) + "}", s)


def is_inline(node):
    return isinstance(node, str) or node.tag in INLINE


def emit(node, depth):
    pad = "  " * depth
    if node.tag == "sc-if":
        cond = dict(node.attrs).get("value", "")
        m = HOLE.fullmatch(cond.strip())
        expr = f"h.{m.group(1)}" if m else js_str(cond)
        return f"{pad}{{{expr} && (<>\n{emit_children(node, depth + 1)}\n{pad}</>)}}"
    attrs = " ".join(attr(k, v) for k, v in node.attrs if not k.startswith("hint-"))
    open_tag = f"<{node.tag}{(' ' + attrs) if attrs else ''}"
    if not node.children or node.tag in VOID:
        return f"{pad}{open_tag} />"
    inner = emit_children(node, depth + 1)
    if "\n" not in inner and len(inner.strip()) < 100:
        return f"{pad}{open_tag}>{inner.strip()}</{node.tag}>"
    return f"{pad}{open_tag}>\n{inner}\n{pad}</{node.tag}>"


def emit_children(node, depth):
    pad = "  " * depth
    kids = node.children
    lines = []
    for i, child in enumerate(kids):
        if isinstance(child, str):
            if not child.strip():
                prev = kids[i - 1] if i > 0 else None
                nxt = kids[i + 1] if i + 1 < len(kids) else None
                if prev is not None and nxt is not None and (is_inline(prev) or is_inline(nxt)):
                    lines.append(pad + '{" "}')
                continue
            lead = child[0].isspace() and i > 0 and is_inline(kids[i - 1])
            trail = child[-1].isspace() and i + 1 < len(kids) and is_inline(kids[i + 1])
            body = text_jsx(child.strip())
            lines.append(pad + ('{" "}' if lead else "") + body + ('{" "}' if trail else ""))
        else:
            lines.append(emit(child, depth))
    return "\n".join(lines)


def split_design(text):
    style = re.search(r"<helmet>.*?<style>(.*?)</style>.*?</helmet>", text, re.S).group(1)
    body = text[text.index("</helmet>") + len("</helmet>"):text.index("</x-dc>")]
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    m = re.search(r"<script type=\"text/x-dc\" data-dc-script data-props='(.*?)'>(.*?)</script>", text, re.S)
    props = json.loads(m.group(1))
    defaults = {k: v.get("default") for k, v in props.items() if not k.startswith("$")}
    title = re.search(r"<title>(.*?)</title>", text, re.S).group(1).strip()
    return style, body.strip(), defaults, m.group(2).strip(), title


def css_for_site(css):
    css = css.replace("--primitive-font-sans:Figtree,", '--primitive-font-sans:"Figtree Variable",Figtree,')
    css = css.replace("font-family: Figtree,", 'font-family: "Figtree Variable",Figtree,')
    def blob(m):
        name = IMAGES.get(m.group(1))
        if not name:
            sys.exit(f"Image {m.group(1)} is not listed in design/images.json")
        return "/images/" + name
    return re.sub(r"/_blob/([0-9a-f]{32})", blob, css)


HEADER = "// Generated by scripts/import_design.py from design/{src}.dc.html. Edit the design file and re-run the script.\n"


def main():
    for src, view, logic, route in PAGES:
        text = (DESIGN / f"{src}.dc.html").read_text()
        css, body, defaults, script, title = split_design(text)

        (ROOT / "components" / "logic" / f"{logic}.js").write_text(
            HEADER.format(src=src)
            + 'import { DCLogic } from "../../lib/dc";\n\n'
            + "export " + script + "\n"
        )

        tree = Tree()
        tree.feed(body)
        roots = [c for c in tree.root.children if not isinstance(c, str)]
        if len(roots) != 1:
            sys.exit(f"{src}: expected one root element, found {len(roots)}")
        jsx = emit(roots[0], 2)
        (ROOT / "components" / "views" / f"{view}.tsx").write_text(
            HEADER.format(src=src)
            + '"use client";\n\n'
            + 'import type React from "react";\n'
            + 'import { useDC } from "../../lib/useDC";\n'
            + 'import { BASE } from "../../lib/base";\n'
            + f'import {{ Component }} from "../logic/{logic}";\n\n'
            + f"const DEFAULTS = {json.dumps(defaults)};\n\n"
            + f"export default function {view}() {{\n"
            + "  const h = useDC(Component, DEFAULTS);\n"
            + "  return (\n"
            + jsx + "\n"
            + "  );\n}\n"
        )

        folder = ROOT / "app" / route if route else ROOT / "app"
        folder.mkdir(parents=True, exist_ok=True)
        (folder / "page.css").write_text(
            "/* Generated by scripts/import_design.py from design/" + src + ".dc.html. */\n" + css_for_site(css)
        )
        print(f"{src:10s} -> components/views/{view}.tsx, app/{route + '/' if route else ''}page.css   ({title})")


if __name__ == "__main__":
    main()
