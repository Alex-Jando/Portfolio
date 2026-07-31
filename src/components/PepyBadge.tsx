const PEPY_BADGE =
  "https://static.pepy.tech/personalized-badge/http-pyserver?period=total&units=INTERNATIONAL_SYSTEM&left_color=BLACK&right_color=GREEN&left_text=downloads";

const PEPY_PROJECT = "https://pepy.tech/projects/http-pyserver";

/**
 * Renders the pepy.tech download badge, but only if pepy actually responds.
 *
 * The badge is a third-party image, so an outage would otherwise leave a
 * broken-image icon on the page. This fetches the SVG server-side and inlines
 * it: if pepy is down, unreachable, or returns anything other than an SVG,
 * the component renders nothing and the surrounding copy still reads
 * correctly.
 *
 * The fetch revalidates daily, so the count stays current between deploys
 * rather than being frozen at whatever it was on the last build.
 */
const PepyBadge = async () => {
  let svg: string;

  try {
    const response = await fetch(PEPY_BADGE, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return null;
    if (!response.headers.get("content-type")?.includes("svg")) return null;

    svg = await response.text();
  } catch {
    // Network error, timeout, or DNS failure: omit the badge entirely.
    return null;
  }

  if (!svg.trimStart().startsWith("<svg")) return null;

  return (
    <p className="pepy-badge">
      <a href={PEPY_PROJECT} target="_blank" rel="noreferrer noopener">
        <span
          aria-label="Total downloads from PyPI, via pepy.tech"
          role="img"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </a>
    </p>
  );
};

export default PepyBadge;
