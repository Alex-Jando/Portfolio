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
        <section className="home-visual">
          <div className="home-mark" aria-hidden="true">
            <Image src="/favicon.jpeg" alt="" width={200} height={200} />
          </div>
          <Image
            className="home-headshot"
            src="/images/alexander-jando-headshot.webp"
            alt="Professional headshot of Alexander Jando"
            width={1024}
            height={1024}
            sizes="(max-width: 680px) 210px, 300px"
            priority
          />
        </section>
        <section className="home-intro">
          <p className="eyebrow">Engineering Portfolio</p>
          <h1>Hi, I&apos;m Alexander Jando.</h1>
          <h3>Developer &#183; Engineer &#183; Designer</h3>
          <p>Here, you&apos;ll find projects I&apos;ve worked on, skills I&apos;ve developed, and insights into my journey as an aspiring engineer.</p>
          <div className="home-actions">
            <Link className="button-link" href="/projects">[ Explore Projects ]</Link>
            <Link className="button-link secondary" href="/resume">[ View Resume ]</Link>
          </div>
        </section>
      </main>
  )
}

export default Home
