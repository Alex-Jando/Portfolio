import type { Metadata } from "next";
import Link from "next/link";
import TypewriterClient from "@/components/TypewriterClient";
import ThemeToggle from "@/components/ThemeToggle";
import sections from "@/../public/data/sections.json";
import "./global.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Alexander Jando",
  description: "The engineering and software portfolio of Alexander Jando.",
};

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
          <Link className="site-wordmark" href="/" aria-label="Alexander Jando — home">
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
          <p>Designed and built by Alexander Jando.</p>
        </footer>
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
