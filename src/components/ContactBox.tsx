import type { ReactNode } from "react";

const Contact = ({
  name,
  link,
  linkText,
  icon,
}: {
  name: string;
  link: string;
  linkText: string;
  icon: ReactNode;
}) => {
  return (
    <section>
      <p>{name}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
      <p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      </p>
    </section>
  );
};

export default Contact;
