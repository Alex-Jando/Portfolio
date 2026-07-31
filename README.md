# Alexander Jando Portfolio

Source code for my personal portfolio website.

## Pages

About, Projects, Resume, Contact, Field Notes

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Adding content

Content is discovered automatically from the filesystem. There is no registry
file to update.

**A project:** create `src/content/projects/<slug>.mdx` exporting a `project`
object. Set `order` to control its position on the projects page (lower is
earlier).

```mdx
export const project = {
  slug: "my-project",
  order: 5,
  title: "My Project",
  // ...see src/components/projects/types.ts
};
```

**A field note:** create `src/content/collections/<id>.mdx` exporting a
`collection` object via `defineCollection`, including its `order`.

Duplicate slugs/ids fail the build with a clear error.

## Social share cards

Link previews (Twitter/X, Facebook, LinkedIn, Discord, iMessage) use branded
1200x630 cards generated into `public/og/`:

```bash
npm run og:build
```

This runs automatically as part of `npm run build`. Cards are derived from each
page's title/description and each project's MDX metadata, so a new project gets
a matching card with no extra work.

## Resume workflow

The mechatronics resume has one editable source file:

```text
resumes/mechatronics/resume.tex
```

Run `npm run resume:build` to regenerate the native web resume data from that
source. The normal production build runs this step automatically. During
development, `npm run dev` also watches the LaTeX source and rebuilds after each
save.

**The downloadable PDF is a separate, manual step.** `public/resume/EngineeringResume.pdf`
is rendered by printing the live `/resume` page with headless Chromium, so it
needs a running site and cannot be produced by `resume:build`:

```bash
# with the site running (locally, staging, or production)
RESUME_URL=https://jando.live/resume npm run resume:pdf
```

After editing `resume.tex`, re-render the PDF or the download will disagree with
the page. `resume:build` guards against this: it fails when the PDF is older
than the LaTeX source, so a stale PDF cannot reach production unnoticed.

## Deployments

Two independent deployments:

| Target | URL | Trigger |
| --- | --- | --- |
| **Production** | `jando.live` | Vercel, automatically on push to `master` |
| **Staging** | `portfolio.jando.live` | Self-hosted, manual via script |

### Staging (self-hosted)

Staging runs on the VPS behind Caddy and is driven by systemd.

First-time setup:

```bash
mkdir -p ~/.config/systemd/user
cp scripts/portfolio-staging.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now portfolio-staging
```

Deploy the current branch:

```bash
scripts/deploy-staging.sh
scripts/deploy-staging.sh --ref my-branch
```

The script builds, restarts the service, and smoke-tests the main routes. It
refuses to deploy `master` to staging so the two environments never blur.

## Environment variables

None are required. Optional:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata/sitemap. Defaults to `https://jando.live`. |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `true`/`false` to force Vercel Analytics on or off. Defaults to on only for Vercel builds. |
| `TECTONIC_BIN` | Absolute path to the Tectonic binary. |

## Theme

Two themes share one accent identity so the site reads consistently:

- **Dark** (default): deep navy with amber `#fca311`
- **Light**: warm cream with burnt amber `#9a5b06`

Both are defined as CSS custom properties at the top of `src/app/global.css`
and meet WCAG AA contrast.

## CI

`.github/workflows/ci.yml` runs typecheck, lint, and build. It deliberately
skips `master`, since production there is validated by Vercel's own build.

## Legacy

`Dockerfile` is retained from the previous Raspberry Pi self-hosting setup and
is not used by either current deployment.
