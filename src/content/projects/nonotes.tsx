import ProjectSection from "@/components/projects/ProjectSection";
import type { ProjectDetail } from "@/components/projects/types";

export const nonotes: ProjectDetail = {
  slug: "nonotes",
  title: "NoNotes",
  category: "AI & Software",
  summary: "An AI-powered note-taking platform that turns recorded audio into a transcription and concise, point-form notes.",
  description: "A case study of NoNotes, the first-place AI note-taking platform built at HappyHacks II.",
  image: "/projects/nonotes.webp",
  imageAlt: "NoNotes logo",
  links: [
    { label: "View Source", href: "https://github.com/Alex-Jando/NoNotes" },
    { label: "View Devpost", href: "https://devpost.com/software/noname-pht40q", variant: "secondary" },
  ],
  facts: [
    { label: "Result", value: "1st Place, HappyHacks II" },
    { label: "Format", value: "48-hour hackathon" },
    { label: "Role", value: "Backend & AI Lead" },
    { label: "Year", value: "2023" },
  ],
  technologies: ["Python", "Flask", "SQLite", "JavaScript", "NLTK", "BERT", "SpeechRecognition", "PyDub"],
  features: [
    "In-browser audio recording",
    "Speech-to-text transcription",
    "Extractive note summarization",
    "Saved note management",
    "Configurable Flask server",
  ],
  content: (
    <>
      <ProjectSection title="Overview">
        <p>NoNotes was built to reduce the work between hearing useful information and turning it into organized notes. A user records audio in the browser, then the application transcribes the recording, restores punctuation, extracts the most important information, and presents both the full transcription and a summarized set of notes.</p>
        <p>I led the backend and AI work, connecting the browser experience to a Flask application and building the processing pipeline behind the product. The project was completed during HappyHacks II and earned first place.</p>
      </ProjectSection>

      <ProjectSection title="How it works">
        <ol className="project-process">
          <li><strong>Record</strong><span>The browser captures spoken audio through a simple recording interface.</span></li>
          <li><strong>Transcribe</strong><span>The server processes the uploaded recording and converts speech into text.</span></li>
          <li><strong>Refine</strong><span>A punctuation service cleans the raw transcription before summarization.</span></li>
          <li><strong>Summarize</strong><span>A BERT-based extractive model identifies key sentences and formats them as point-form notes.</span></li>
          <li><strong>Save</strong><span>The application stores the title, transcription, and summarized notes for later retrieval.</span></li>
        </ol>
      </ProjectSection>

      <ProjectSection title="My contribution">
        <p>I designed the Flask routes and REST endpoints that coordinate file uploads, transcription, summarization, note creation, and deletion. I also integrated the processing services and the SQLite-backed storage layer so the frontend could save and retrieve completed notes through a consistent interface.</p>
      </ProjectSection>

      <ProjectSection title="Outcome">
        <p>The team delivered a working end-to-end prototype within the hackathon window. NoNotes demonstrated a complete path from microphone input to persistent, readable notes and received first place at HappyHacks II.</p>
      </ProjectSection>
    </>
  ),
};
