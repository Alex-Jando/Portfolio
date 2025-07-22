import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import Typewriter, { TypewriterClass } from "typewriter-effect";
import { sections } from "./assets/sections";

const App = () => {
  return (
    <>
      <header>
        <h2>
          <Typewriter
            options={{
              strings: [],
              autoStart: true,
              cursor: "_",
            }}
            onInit={(typewriter: TypewriterClass) => {
              typewriter.typeString("Alexander Jando");
            }}
          />
        </h2>
        <nav>
          <ul>
            {sections.map(([name, path]) => (
              <li key={name}>
                <a href={path}>[ {name} ]</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
      <footer></footer>
    </>
  );
};

export default App;
