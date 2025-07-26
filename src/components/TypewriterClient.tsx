"use client";

import Typewriter, { TypewriterClass } from "typewriter-effect";

const TypewriterClient = ({ text }: { text: string }) => {
  return (
    <Typewriter
      options={{
        strings: [],
        autoStart: true,
        cursor: "_",
      }}
      onInit={(typewriter: TypewriterClass) => {
        typewriter.typeString(text);
      }}
    />
  );
}

export default TypewriterClient;