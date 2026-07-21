import Image from "next/image";

type ProjectMediaProps = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export default function ProjectMedia({ src, alt, caption, width, height }: ProjectMediaProps) {
  return (
    <figure className="project-media">
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 900px) 100vw, 720px" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
