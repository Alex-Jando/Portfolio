import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | Alexander Jando",
  description: "Welcome to my portfolio website, showcasing my projects and skills as a developer and designer.",
};

const Home = () => {


  return (
      <main className="home page-shell">
        <section className="home-mark" aria-hidden="true">
          <Image src="/favicon.jpeg" alt="Website Favicon Logo" width={200} height={200} />
        </section>
        <section className="home-intro">
          <p className="eyebrow">Hello, world.</p>
          <h1>Hi, I&apos;m Alexander Jando.</h1>
          <h3>Developer &#183; Engineer &#183; Designer</h3>
          <p>Here, you&apos;ll find projects I&apos;ve worked on, skills I&apos;ve developed, and insights into my journey as an aspiring engineer.</p>
          <div className="home-actions">
            <Link className="button-link" href="/projects">[ Explore Projects ]</Link>
            <Link className="button-link secondary" href="/resume">[ View Résumé ]</Link>
          </div>
        </section>
      </main>
  )
}

export default Home
