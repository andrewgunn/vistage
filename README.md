# Vistage UK: website refresh concept

A design refresh concept for [vistage.co.uk](https://vistage.co.uk/). Static HTML/CSS/JS, responsive from small phones to large desktops.

**Not indexed.** Every page has `noindex, nofollow` robots meta tags so it never competes with the live site in search. `robots.txt` also disallows all crawling.

## Editing

Page content lives in `src/pages/`, and the shared header, footer and call to action live in `src/partials/`. After editing, run:

```sh
python3 build.py
```

This writes the finished pages to the repo root, which GitHub Pages serves.
