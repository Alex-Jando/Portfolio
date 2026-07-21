import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoNotes | Alexander Jando",
  description: "A case study of NoNotes, the first-place AI note-taking platform built at HappyHacks II.",
};

const githubUrl = "https://github.com/Alex-Jando/NoNotes";
const devpostUrl = "https://devpost.com/software/noname-pht40q";

export default function NoNotesPage() {
  return (
    <main className="page-shell project-detail">
      <Link className="project-back" href="/projects">← Back to projects</Link>

      <header className="project-detail-hero">
        <div className="project-detail-heading">
          <p className="eyebrow">AI &amp; Software</p>
          <h1>NoNotes</h1>
          <p className="project-detail-lede">
            An AI-powered note-taking platform that turns recorded audio into a transcription and concise, point-form notes.
          </p>
          <div className="project-detail-actions">
            <a className="button-link" href={githubUrl} target="_blank" rel="noopener noreferrer">[ View Source ↗ ]</a>
            <a className="button-link secondary" href={devpostUrl} target="_blank" rel="noopener noreferrer">[ View Devpost ↗ ]</a>
          </div>
        </div>
        <div className="project-detail-mark">
          <Image src="/projects/nonotes.webp" alt="NoNotes logo" width={600} height={600} priority />
        </div>
      </header>

      <section className="project-facts" aria-label="Project summary">
        <div><span>Result</span><strong>1st Place, HappyHacks II</strong></div>
        <div><span>Format</span><strong>48-hour hackathon</strong></div>
        <div><span>Role</span><strong>Backend &amp; AI Lead</strong></div>
        <div><span>Year</span><strong>2023</strong></div>
      </section>

      <div className="project-detail-body">
        <article className="project-story">
          <section>
            <h2>Overview</h2>
            <p>NoNotes was built to reduce the work between hearing useful information and turning it into organized notes. A user records audio in the browser, then the application transcribes the recording, restores punctuation, extracts the most important information, and presents both the full transcription and a summarized set of notes.</p>
            <p>I led the backend and AI work, connecting the browser experience to a Flask application and building the processing pipeline behind the product. The project was completed during HappyHacks II and earned first place.</p>
          </section>

          <section>
            <h2>How it works</h2>
            <ol className="project-process">
              <li><strong>Record</strong><span>The browser captures spoken audio through a simple recording interface.</span></li>
              <li><strong>Transcribe</strong><span>The server processes the uploaded recording and converts speech into text.</span></li>
              <li><strong>Refine</strong><span>A punctuation service cleans the raw transcription before summarization.</span></li>
              <li><strong>Summarize</strong><span>A BERT-based extractive model identifies key sentences and formats them as point-form notes.</span></li>
              <li><strong>Save</strong><span>The application stores the title, transcription, and summarized notes for later retrieval.</span></li>
            </ol>
          </section>

          <section>
            <h2>My contribution</h2>
            <p>I designed the Flask routes and REST endpoints that coordinate file uploads, transcription, summarization, note creation, and deletion. I also integrated the processing services and the SQLite-backed storage layer so the frontend could save and retrieve completed notes through a consistent interface.</p>
          </section>

          <section>
            <h2>Outcome</h2>
            <p>The team delivered a working end-to-end prototype within the hackathon window. NoNotes demonstrated a complete path from microphone input to persistent, readable notes and received first place at HappyHacks II.</p>
          </section>
        </article>

        <aside className="project-sidebar">
          <section>
            <h2>Technology</h2>
            <ul className="project-tags">
              <li>Python</li><li>Flask</li><li>SQLite</li><li>JavaScript</li><li>NLTK</li><li>BERT</li><li>SpeechRecognition</li><li>PyDub</li>
            </ul>
          </section>
          <section>
            <h2>Core features</h2>
            <ul>
              <li>In-browser audio recording</li>
              <li>Speech-to-text transcription</li>
              <li>Extractive note summarization</li>
              <li>Saved note management</li>
              <li>Configurable Flask server</li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
