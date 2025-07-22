import { useEffect } from "react";

const About = () => {

  useEffect(() => {
      document.title = "About | Alexander Jando";
    }, []);

  return (
    <main>
      <h1>About Me</h1>
      <section className="about">
        <p>
          I'm an engineering student studying at McMaster University. I'm interested in using technology to innovate and solve problems. I like to work on projects that challenge me and provide tangible benefits to others. In my free time, I enjoy exploring new technologies, contributing to open-source projects, and learning about new technologies.
        </p>
        <p>
          Some of my hobbies outside of technology include rugby, skiing and swimming. I also enjoy spending time outdoors on hikes and while fishing. Travelling is another passion of mine. I love getting to know the history and culture of new places.
        </p>
        <p>
          Currently, I am focused on expanding my skillset and gaining experience through projects and work. I'm fascinated by the growth of AI and its endless possible applications. I try to stay up-to-date with the latest trends in technology and utilize them in my projects.
        </p>
        <p>I am always looking for new opportunities to learn and grow, whether through internships, co-op positions, or personal projects. If you have any questions or would like to <a href="https://jando.live/contact">connect</a>, feel free to reach out!</p>
      </section>
    </main>
  )
}

export default About