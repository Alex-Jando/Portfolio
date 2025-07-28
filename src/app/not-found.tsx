import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found | Alexander Jando",
  description: "This page doesn't exist yet.",
};

const NotFound = () => {


  return (
      <main className="not-found">
        <section>
          <h1>Page Not Found</h1>
        </section>
        <section><Link href="/">[ Return Home ]</Link>
        </section>
      </main>
  )
}

export default NotFound;
