#!/usr/bin/env python3
"""Assemble src/pages/*.html with shared partials into the site root."""
import hashlib, pathlib, re

root = pathlib.Path(__file__).parent
partials = {p.stem: p.read_text() for p in (root / "src/partials").glob("*.html")}
version = hashlib.md5(b"".join((root / f).read_bytes() for f in ("assets/styles.css", "assets/main.js"))).hexdigest()[:8]
navs = ["membership", "programmes", "members", "chair"]

for page in sorted((root / "src/pages").glob("*.html")):
    raw = page.read_text()
    meta_block, body = re.match(r"---\n(.*?)\n---\n(.*)", raw, re.S).groups()
    meta = dict(line.split(":", 1) for line in meta_block.splitlines())
    meta = {k.strip(): v.strip() for k, v in meta.items()}
    head = partials["head"].replace("{{title}}", meta["title"]).replace("{{description}}", meta["description"]).replace("{{v}}", version)
    for n in navs:
        head = head.replace("{{nav_%s}}" % n, ' aria-current="page"' if meta.get("nav") == n else "")
    html = head + body.replace("{{cta}}", partials["cta"]) + partials["foot"]
    (root / page.name).write_text(html)
    print("built", page.name)
