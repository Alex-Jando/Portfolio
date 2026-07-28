import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Alexander Jando",
  description: "Here's a general overview about who I am and things that interest me.",
};

const About = () => {

  return (
    <main className="page-shell">
      <p className="eyebrow">Background &amp; Interests</p>
      <h1>About Me</h1>
      <section className="about">
        <p>
          I&apos;m a mechatronics engineering student at McMaster University.
          I&apos;m most interested in embedded systems, robotics, and practical
          software. I enjoy projects where I can test something physical, figure
          out why it failed, and improve both the hardware and code until the
          full system works.
        </p>
        <p>
          Hackathons, robotics competitions, course projects, and personal
          experiments have pushed me to learn unfamiliar tools quickly. They
          have also taught me to document trade-offs, ask better questions, and
          be honest about what a prototype actually proves.
        </p>
        <p>
          Outside engineering, I enjoy rugby, skiing, swimming, hiking, and
          fishing. I also like travelling and learning about the history and
          culture of new places.
        </p>
        <p>
          Right now, I&apos;m looking for opportunities to contribute, learn
          from experienced engineers, and keep building useful systems. You can
          <Link href="/projects"> browse my projects</Link> or{" "}
          <Link href="/contact">get in touch</Link>.
        </p>
      </section>
    </main>
  )
}

export default About
