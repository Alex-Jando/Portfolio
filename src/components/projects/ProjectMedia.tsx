import Image from "next/image";

type ProjectMediaProps = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  className?: string;
};

export default function ProjectMedia({ src, alt, caption, width, height, className = "" }: ProjectMediaProps) {
  return (
    <figure className={`project-media ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 680px) 100vw, (max-width: 1100px) 72vw, 820px"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
