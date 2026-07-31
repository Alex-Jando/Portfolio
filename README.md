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

## Resume workflow

The mechatronics resume has one editable source file:

```text
resumes/mechatronics/resume.tex
```

Run `npm run resume:build` to regenerate both the native web resume data and
`public/resume/EngineeringResume.pdf`. The normal production build runs this
step automatically. During development, `npm run dev` also watches the LaTeX
source and rebuilds after each save.

PDF generation uses Tectonic. Install the `tectonic` executable somewhere on
`PATH`, or set `TECTONIC_BIN` to its absolute path. If Tectonic is temporarily
unavailable, the last valid PDF is retained while the web version is updated.

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
sudo cp scripts/portfolio-staging.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-staging
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

## CI

`.github/workflows/ci.yml` runs typecheck, lint, and build. It deliberately
skips `master`, since production there is validated by Vercel's own build.

## Legacy

`Dockerfile` is retained from the previous Raspberry Pi self-hosting setup and
is not used by either current deployment.
