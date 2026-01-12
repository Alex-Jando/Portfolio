import type { Metadata } from "next";
import Link from "next/link";
import TypewriterClient from "@/components/TypewriterClient";
import sections from "@/../public/data/sections.json";
import "./global.css";

export const metadata: Metadata = {
  title: "Alexander Jando",
  description: "Portfolio of Alexander Jando.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
        <header>
          <h2>
            <TypewriterClient text="Alexander Jando" />
          </h2>
          <nav>
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
        </header>
        {children}
        <footer></footer>
      </body>
    </html>
  );
}
