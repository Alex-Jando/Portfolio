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
      <a href={link} aria-label={`${name}: ${linkText}`}>
        {icon}
      </a>
      <p>
        <a href={link}>
          {linkText}
        </a>
      </p>
    </section>
  );
};

export default Contact;
