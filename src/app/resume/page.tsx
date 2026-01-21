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
      <a href="/resume/EngineeringResume.pdf" download>
        Download PDF
      </a>
      <header>
        <h2>Alexander Jando</h2>

        <p>Hamilton, ON and West Vancouver, BC</p>
        <ul>
          <li>
            <a href="mailto:alex@jando.live">alex@jando.live</a>
          </li>
          <li>
            <a href="tel:+12368655560">+1 (236) 865-5560</a>
          </li>
          <li>
            <a href="https://jando.live" target="_blank" rel="noreferrer">
              https://jando.live/
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Alex-Jando"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/Alex-Jando/
            </a>
          </li>

          <li>
            <a
              href="https://www.linkedin.com/in/alex-jando"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn: alex-jando
            </a>
          </li>
        </ul>
      </header>

      <section>
        <h3>Summary</h3>
        <p>
          Engineering student at McMaster University with strong experience in
          software, robotics, and hardware systems. Proven ability to design,
          build, and deploy real engineering solutions including AI software,
          autonomous vehicles, and mechanical systems. Experienced working in
          high responsibility environments and delivering working technical
          products.
        </p>
      </section>

      <section>
        <h3>Education</h3>
        <h4>McMaster University</h4>
        <p>Bachelor of Engineering (B.Eng.), General Engineering Focus:</p>
        <p>Mechatronics, Computer and Mechanical Engineering</p>
        <p>Expected Graduation: 2029</p>
        <br />
        <h4>École Sentinel Secondary School</h4>
        <p>Bilingual Dual Dogwood Diploma</p>
      </section>

      <section>
        <h3>Technical Skills</h3>

        <ul>
          <li>
            <span>Programming:</span> Python, C++, Java, JavaScript, MATLAB
          </li>
          <li>
            <span>Web:</span> HTML, CSS, React, Next.js, Flask
          </li>
          <li>
            <span>Databases:</span> SQL (SQLite), MongoDB
          </li>
          <li>
            <span>AI and Computer Vision:</span> NLTK, OpenCV, NumPy
          </li>
          <li>
            <span>Version Control:</span> Git
          </li>
          <li>
            <span>Operating Systems:</span> Linux, Windows
          </li>
          <li>
            <span>Embedded Systems:</span> Arduino, Raspberry Pi, Jetson Nano
          </li>
          <li>
            <span>CAD:</span> Autodesk Inventor, OnShape
          </li>
          <li>
            <span>Cloud and Hosting:</span> Oracle Cloud, Cloudflare Tunnel,
            GitHub Pages
          </li>
        </ul>
      </section>

      <section>
        <h3>Experience</h3>

        <h4>McMaster University</h4>
        <p>September 2025 – December 2025</p>
        <p>Engineering Project Manager & Software Lead</p>
        <ul>
          <li>
            Led and coordinated a multidisciplinary engineering team through
            planning, design, and final system delivery
          </li>
          <li>
            Managed project scope, timelines, and task allocation across
            mechanical and software components
          </li>
          <li>
            Designed mechanical parts in Autodesk Inventor and manufactured
            components using 3D printing and laser cutting
          </li>
          <li>
            Developed Python-based control software and integrated Raspberry Pi
            and Arduino motor control systems
          </li>
          <li>
            Oversaw system integration and testing to achieve reliable,
            repeatable robotic performance
          </li>
        </ul>
        <br />

        <h4>Hypercharge Canada</h4>
        <p>June 2023 – August 2023</p>
        <p>EV Charger Technician Intern</p>
        <ul>
          <li>
            Prepared and configured over 100 EV charging stations for deployment
            by initializing firmware and registering units on the Hypercharge
            network
          </li>
          <li>
            Disassembled and repaired malfunctioning or uncalibrated chargers by
            replacing internal hardware components
          </li>
          <li>
            Performed hardware testing, electrical checks, and quality control
            to ensure devices were field ready
          </li>
          <li>
            Used hand and power tools including drills and screwdrivers to
            assemble and service units in a warehouse production environment
          </li>
          <li>
            Documented device status and followed strict safety and quality
            procedures
          </li>
        </ul>
        <br />

        <h4>Hollyburn Country Club</h4>
        <p>August 2024 – June 2025</p>
        <p>Lifeguard and Swim Instructor</p>
        <ul>
          <li>
            Ensured safety of swimmers through active surveillance, emergency
            response, and risk assessment
          </li>
          <li>
            Instructed swimmers of all ages, developing strong communication and
            leadership skills
          </li>
          <li>Maintained compliance with safety and operational standards</li>
        </ul>
        <br />
        <h4>Whistler Blackcomb</h4>
        <p>November 2022 – May 2024</p>
        <p>CSIA Level 2 Ski Instructor</p>
        <ul>
          <li>
            Delivered technical skiing and mountain safety instruction to
            individuals and groups
          </li>
          <li>
            Assessed performance and adapted lesson plans to student ability
          </li>
          <li>
            Worked in high-risk outdoor environments requiring responsibility
            and clear decision making
          </li>
        </ul>
      </section>

      <section>
        <h3>Projects</h3>

        <h4>NoNotes – AI Powered Note Taking Platform</h4>
        <p>Hackathon Project | Backend Lead</p>
        <ul>
          <li>
            Built the backend AI system for an audio to text and note
            summarization platform used in a 48-hour hackathon
          </li>
          <li>
            Developed a Flask API and SQLite database to store, process, and
            retrieve user notes
          </li>
          <li>
            Implemented natural language processing using NLTK to extract and
            summarize important information from text
          </li>
          <li>
            Integrated speech to text processing to convert spoken audio into
            searchable notes
          </li>
          <li>
            Designed system logging and API endpoints to support a full
            web-based frontend
          </li>
          <li>Project won first place at HappyHacks II</li>
        </ul>
        <br />
        <p>
          Video Demo:{" "}
          <a
            href="https://www.youtube.com/watch?v=EBiBeUzb0xY/"
            target="_blank"
            rel="noreferrer"
          >
            youtube.com/watch?v=EBiBeUzb0xY/
          </a>
        </p>
        <br />

        <h4>Skydle – Online Wordle Game for Hypixel Skyblock</h4>
        <p>Solo Project</p>
        <ul>
          <li>
            Designed and built a full stack interactive web game using React and
            JavaScript
          </li>
          <li>
            Pulled live game data from an external API to dynamically generate
            puzzles
          </li>
          <li>Created a clean, responsive UI and game logic for daily play</li>
        </ul>
        <br />
        <p>
          Live Demo:{" "}
          <a
            href="https://alex-jando.github.io/Skydle/"
            target="_blank"
            rel="noreferrer"
          >
            https://alex-jando.github.io/Skydle/
          </a>
        </p>
        <br />

        <h4>PY-RAT – Security Research and Remote Admin Tool</h4>
        <p>Solo Project</p>
        <ul>
          <li>Implemented live camera streaming using OpenCV and NumPy</li>
          <li>
            Developed security research features including credential access
            testing and remote command execution
          </li>
          <li>
            Packaged the full application into a distributable executable using
            PyInstaller
          </li>
        </ul>
        <br />
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/Alex-Jando/PY-RAT/"
            target="_blank"
            rel="noreferrer"
          >
            github.com/Alex-Jando/PY-RAT/
          </a>
        </p>
        <br />

        <h4>FIRA RoboWorld Cup Autonomous Race Car</h4>
        <p>Team Project | National 1st Place, International 2nd Place</p>
        <ul>
          <li>
            Designed and built an autonomous line following race car with a
            teammate
          </li>
          <li>
            Programmed Raspberry Pi and Arduino systems using Python and C
          </li>
          <li>
            Used a Logitech camera and computer vision edge detection to track
            road lines in real time
          </li>
          <li>
            Implemented a PID controller to adjust steering based on visual
            input
          </li>
          <li>
            Performed extensive physical testing and tuning to achieve reliable
            race performance
          </li>
        </ul>
        <br />
        <p>
          News Article:{" "}
          <a
            href="https://www.nsnews.com/local-news/west-van-high-school-trio-wins-national-robotics-championship-sets-eyes-on-world-stage-8817010/"
            target="_blank"
            rel="noreferrer"
          >
            https://www.nsnews.com/local-news/west-van-high-school-trio-wins-national-robotics-championship-sets-eyes-on-world-stage-8817010/
          </a>
        </p>
        <br />

        <h4>Q-Arm Order Packing Robot</h4>
        <p>Team Project | ENG 1P13 Engineering Design Project</p>
        <ul>
          <li>
            Designed and modeled a custom robotic end effector in Autodesk
            Inventor
          </li>
          <li>
            Built control software to automate object pickup and placement
          </li>
          <li>
            Created mechanical CAD assemblies and tested gripping mechanisms for
            reliability
          </li>
        </ul>
        <br />
        <p>
          Project Site:{" "}
          <a
            href="https://www.notion.so/P-1-Robotic-End-Effector-System-2c2a5473791681db954af45b4c336348?pvs=74/"
            target="_blank"
            rel="noreferrer"
          >
            https://www.notion.so/P-1-Robotic-End-Effector-System-2c2a5473791681db954af45b4c336348?pvs=74/
          </a>
        </p>
        <br />

        <h4>AI Short Story Video Maker</h4>
        <p>Solo Project</p>
        <ul>
          <li>
            Built a locally run AI system that generates short form videos from
            a single prompt
          </li>
          <li>
            Automated story generation, image creation, and video rendering into
            a complete pipeline
          </li>
        </ul>
        <br />
        <p>
          Sample Video:{" "}
          <a
            href="https://github.com/Alex-Jando/AIShortStoryVideoMaker/raw/refs/heads/master/examples/sample_video.mp4/"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/Alex-Jando/AIShortStoryVideoMaker/raw/refs/heads/master/examples/sample_video.mp4/
          </a>
        </p>
        <br />

        <h4>HTTP-PyServer</h4>
        <p>Solo Project</p>
        <ul>
          <li>
            Created a lightweight Python HTTP server framework focused on
            simplicity and performance
          </li>
          <li>Published the package to PyPI for public installation and use</li>
        </ul>
        <br />
        <p>
          PyPi Project:{" "}
          <a
            href="https://pypi.org/project/HTTP-PyServer/"
            target="_blank"
            rel="noreferrer"
          >
            https://pypi.org/project/HTTP-PyServer/
          </a>
        </p>
        <br />

        <h4>Personal Engineering Portfolio</h4>
        <p>Solo Project</p>
        <ul>
          <li>
            Designed and built a responsive engineering portfolio using Next.js,
            HTML, CSS, and JavaScript
          </li>
          <li>
            Implemented server-side rendering and SEO to improve load times and
            search visibility
          </li>
          <li>
            Deployed on a Linux server running in Oracle Cloud with Cloudflare
            Tunnel for secure 24/7 access
          </li>
          <li>
            Managed hosting, updates, and version control using Git to maintain
            a live production site
          </li>
        </ul>
        <br />
        <p>
          Live Site:{" "}
          <a href="https://jando.live/" target="_blank" rel="noreferrer">
            https://jando.live/
          </a>
        </p>
        <br />

        <h4>MyPlate – Nutrition and Macro Planner</h4>
        <p>Team Project | Awarded Developer of the Year</p>
        <ul>
          <li>
            Built a mobile nutrition and meal planning application using Java in
            Android Studio
          </li>
          <li>
            Designed features for tracking macronutrients, meals, and daily
            nutrition goals
          </li>
          <li>
            Implemented data storage and retrieval to save user food logs and
            preferences
          </li>
          <li>
            Developed a clean and simple user interface focused on usability and
            fast data entry
          </li>
        </ul>
        <br />
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/Alex-Jando/GOA2023-MyPlate/"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/Alex-Jando/GOA2023-MyPlate/
          </a>
        </p>
      </section>

      <section>
        <h3>Certifications</h3>
        <ul>
          <li>National Lifeguard</li>
          <li>Standard First Aid and CPR C</li>
          <li>Swim and Lifesaving Instructor</li>
          <li>CSIA Level 1 Ski Instructor</li>
          <li>CSIA Level 2 Ski Instructor</li>
          <li>DELF B2 French Certification</li>
        </ul>
      </section>

      <section>
        <h3>Awards</h3>
        <ul>
          <li>1st Place, HappyHacks II Hackathon</li>
          <li>
            1st Place, FIRA RoboWorld Cup National Autonomous Car Division
          </li>
          <li>
            2nd Place, FIRA RoboWorld Cup International Autonomous Car Division
          </li>
          <li>CyberTitan Platinum Division</li>
          <li>Developer of the Year, GameOfApps</li>
        </ul>
      </section>

      <section>
        <h3>Languages</h3>
        <ul>
          <li>English (Native)</li>
          <li>French (Fluent, DELF B2)</li>
        </ul>
      </section>

      <section>
        <h3>Interests</h3>
        <p>
          Robotics, Artificial Intelligence, Mechanical Systems, Coding
          Competitions, Skiing, Rugby, Gym
        </p>
      </section>

      <section>
        <h3>References</h3>
        <p>Available upon request</p>
      </section>
    </main>
  );
};

export default Resume;
