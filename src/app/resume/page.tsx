import { Metadata } from "next";
import ResumePDF from "@/components/ResumePDF";

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
      <section>
        <ResumePDF />
      </section>
    </main>
  );
};

export default Resume;
