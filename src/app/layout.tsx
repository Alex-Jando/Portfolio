import type { Metadata } from "next";
import Link from "next/link";
import TypewriterClient from "../components/TypewriterClient";
import sections from "../../public/data/sections.json";
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
        <link rel="icon" type="image/jpeg" href="/favicon.jpeg" />
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
                  <Link href={path} prefetch={true}>[ {name} ]</Link>
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
