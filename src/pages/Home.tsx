import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    document.title = "Home | Alexander Jando";
  }, []);

  return (
      <main className="home">
        <section>
          <img src="/favicon.jpeg" alt="Website Favicon Logo" />
        </section>
        <section>
          <h1>Hi, I'm Alexander Jando.</h1>
          <h3>Developer &#183; Engineer &#183; Designer</h3>
        </section>
        <section>
          <p>Here, you'll find projects I've worked on, skills I've developed, and insights into my journey as an aspiring engineer.</p>
        </section>
      </main>
  )
}

export default Home
