import chokidar from "chokidar";
import { spawn } from "node:child_process";

let running = false;
let queued = false;

function build() {
  if (running) {
    queued = true;
    return;
  }
  running = true;
  const child = spawn("npm", ["run", "resume:build"], { stdio: "inherit" });
  child.on("exit", () => {
    running = false;
    if (queued) {
      queued = false;
      build();
    }
  });
}

chokidar.watch("resumes/**/*.tex", { ignoreInitial: true }).on("all", build);
console.log("Watching resumes/**/*.tex for changes…");
