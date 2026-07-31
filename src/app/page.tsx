import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Home | Alexander Jando",
  description: "Welcome to my portfolio website, showcasing my projects and skills as a developer and designer.",
  alternates: { canonical: "/" },
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
          <p>
            I&apos;m a mechatronics engineering student who enjoys building
            across hardware and software, from embedded devices and robots to
            practical developer tools.
          </p>
          <div className="home-actions">
            <Link className="button-link" href="/projects">[ Explore Projects ]</Link>
            <Link className="button-link secondary" href="/resume">[ View Resume ]</Link>
            <Link className="button-link secondary" href="/contact">[ Contact Me ]</Link>
          </div>
          <div className="home-contact-links" aria-label="Quick contact links">
            <a href="mailto:alex@jando.live" aria-label="Email Alexander Jando">
              <FaEnvelope aria-hidden="true" />
              <span>Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/alex-jando/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Alexander Jando on LinkedIn"
            >
              <FaLinkedin aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/Alex-Jando"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Alexander Jando on GitHub"
            >
              <FaGithub aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </main>
  )
}

export default Home
