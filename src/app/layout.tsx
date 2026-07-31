import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import TypewriterClient from "@/components/TypewriterClient";
import sections from "@/../public/data/sections.json";
import "./global.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd, personSchema, websiteSchema, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://jando.live"),
  title: "Alexander Jando",
  description: "The engineering and software portfolio of Alexander Jando.",
  alternates: { canonical: "./" },
  // Staging mirror must not be indexed alongside production.
  ...((process.env.NEXT_PUBLIC_SITE_URL ?? "").includes("portfolio.jando.live")
    ? { robots: { index: false, follow: false } }
    : {}),
  openGraph: {
    type: "website",
    siteName: "Alexander Jando",
    title: "Alexander Jando | Mechatronics Engineering Portfolio",
    description: "Embedded systems, robotics, software, and engineering projects by Alexander Jando.",
    images: [{ ...ogImage("default"), alt: "Alexander Jando engineering portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexander Jando | Mechatronics Engineering Portfolio",
    description: "Embedded systems, robotics, software, and engineering projects by Alexander Jando.",
    images: [{ ...ogImage("default"), alt: "Alexander Jando engineering portfolio" }],
  },
};

/**
 * Vercel Analytics only reports from a Vercel deployment. Self-hosted
 * previews (for example the staging box) would otherwise load a script that
 * can never report, so it is disabled unless explicitly turned on.
 *
 * Set NEXT_PUBLIC_ENABLE_ANALYTICS="true" to force it on.
 */
const analyticsEnabled =
  process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true" ||
  (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false" &&
    process.env.VERCEL === "1");

const themeScript = `
  (() => {
    const saved = localStorage.getItem('theme');
    const theme = saved === 'light' || saved === 'dark'
      ? saved
      : (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd schema={personSchema()} />
        <JsonLd schema={websiteSchema()} />
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Jando.live" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <header className="site-header">
          <Link className="site-wordmark" href="/" aria-label="Alexander Jando, home">
            <TypewriterClient text="Alexander Jando" />
          </Link>
          <nav aria-label="Main navigation">
            <ul>
              {sections.map(([name, path]) => (
                <li key={name}>
                  <Link href={path} prefetch={true}>
                    [ {name} ]
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </header>
        <div id="main-content">{children}</div>
        <footer className="site-footer">
          <p className="site-footer-copy">
            &copy; {new Date().getFullYear()} Alexander Jando
          </p>
          <nav aria-label="Footer">
            <ul className="site-footer-links">
              <li>
                <a href="mailto:alex@jando.live">Email</a>
              </li>
              <li>
                <a
                  href="https://github.com/Alex-Jando"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/alex-jando/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>
        </footer>
      </body>
      {analyticsEnabled && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </html>
  );
}
