import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home | Alexander Jando",
  description: "Welcome to my portfolio website, showcasing my projects and skills as a developer and designer.",
};

const Home = () => {


  return (
      <main className="home">
        <section>
          <Image src="/favicon.jpeg" alt="Website Favicon Logo" width={200} height={200} />
        </section>
        <section>
          <h1>Hi, I&apos;m Alexander Jando.</h1>
          <h3>Developer &#183; Engineer &#183; Designer</h3>
        </section>
        <section>
          <p>Here, you&apos;ll find projects I&apos;ve worked on, skills I&apos;ve developed, and insights into my journey as an aspiring engineer.</p>
        </section>
      </main>
  )
}

export default Home
