import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Alexander Jando",
  description:
    "Here is a detailed resume listing the work experience, education, and projects of Alexander Jando.",
};

const Resume = () => {
  return (
    <main className="resume">
      <h1>Resume</h1>
      <section>
        <article className="resume-header">
          <h3>Alexander Jando</h3>
          <p>Engineering Student</p>
          <p>West Vancouver BC, Canada / Hamilton ON, Canada</p>
          <ul>
            <li>
              <a href="mailto:alex@jando.live">alex@jando.live</a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/alex-jando/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Alex-Jando"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://jando.live"
                target="_blank"
                rel="noopener noreferrer"
              >
                My Website
              </a>
            </li>
          </ul>
        </article>
        <article>
          <p>
            I am a dedicated engineering student with a passion for technology
            and innovation. I have experience in software development, web
            design, and computer hardware. I am always eager to learn new skills
            and take on new challenges.
          </p>
        </article>
        <article>
          <h4>Skills</h4>
          <ul>
            <li>Programming Languages: Python, JavaScript, Java, C++</li>
            <li>Web Development: HTML, CSS, JS, React</li>
            <li>Database Management: SQL, MongoDB</li>
            <li>Version Control: Git</li>
            <li>Operating Systems: Linux, Windows</li>
            <li>Hardware: RaspberryPi, Arduino, JetsonNano</li>
            <li>CAD: AutoDesk Inventor, OnShape</li>
          </ul>
        </article>
        <article>
          <h4>Education</h4>
          <ul>
            <li>
              Bilingual Dual Dogwood Highschool Diploma - &Eacute;cole Sentinel
              Secondary - 2020 to 2025
            </li>
            <li>Engineering Student - McMaster University - 2025 to Current</li>
          </ul>
        </article>
        <article>
          <h4>Experience</h4>
          <ul>
            <li>
              EV Charger Technician Intern - Hypercharge Canada - June 2023 to
              August 2023
            </li>
            <li>
              Lifeguard & Swim Instructor - Hollyburn Country Club - August 2024
              to June 2025
            </li>
            <li>
              Ski Instructor - Whistler Blackcomb - November 2022 to May 2024
            </li>
          </ul>
        </article>
        <article>
          <h4>Projects</h4>
          <ul>
            <li>NoNotes - AI Powered Note-Taking Program - October 2023</li>
            <li>PY-RAT - Python-Build Remote Access Trojan - January 2023</li>
            <li>
              MyPlate - Macro-Focused Meal Planning and Creation App - April
              2023
            </li>
            <li>Skydle - Hypixel Skyblock Wordle Game - May 2024</li>
            <li>
              HTTP-PyServer - Light-Weight Python HTTP Server Engine Package -
              June 2023
            </li>
          </ul>
        </article>
        <article>
          <h4>Certifications</h4>
          <ul>
            <li>CPR C & Standard First Aid - Red Cross - February 2025</li>
            <li>National Lifeguard - Lifesaving Society - February 2025</li>
            <li>
              Swim & Lifesaving Instructor - Lifesaving Society - February 2025
            </li>
            <li>
              Whistler Blackcomb Level 1 Ski Instructor - CSIA - December 2022
            </li>
            <li>
              Whistler Blackcomb Level 2 Ski Instructor - CSIA - December 2023
            </li>
            <li>DELF B2 - Alliance Fran&ccedil;aise Vancouver - May 2025</li>
          </ul>
        </article>
        <article>
          <h4>Awards</h4>
          <ul>
            <li>1st Place - HappyHacksII Hackathon - October 2023</li>
            <li>
              2nd Place - FIRA RoboWorld Cup International Autonomous Car
              Division - August 2024
            </li>
            <li>
              1st Place - FIRA RoboWorld Cup National Autonomous Car Division -
              March 2024
            </li>
            <li>Developer of the Year - GameOfApps - June 2023</li>
            <li>Platinum Division - CyberTitan - November 2024</li>
          </ul>
        </article>
      </section>
    </main>
  );
};

export default Resume;
