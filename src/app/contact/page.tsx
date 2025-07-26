import ContactBox from "../../components/ContactBox";
import { Metadata } from "next";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact | Alexander Jando",
  description: "Contact page for Alexander Jando.",
};

const contacts = [
  {
    name: "Email",
    link: "mailto:alex@jando.live",
    linkText: "alex@jando.live",
    icon: <FaEnvelope />,
  },
  {
    name: "Phone",
    link: "tel:+12368655560",
    linkText: "+1 (236) 865-5560",
    icon: <FaPhone />,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/alex-jando/",
    linkText: "Alex Jando",
    icon: <FaLinkedin />,
  },
  {
    name: "GitHub",
    link: "https://github.com/Alex-Jando",
    linkText: "Alex-Jando",
    icon: <FaGithub />,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/alex.k.jando",
    linkText: "alex.k.jando",
    icon: <FaInstagram />,
  }
]

const Contact = () => {

  return (
    <main>
      <h1>Contact Me</h1>
      <section className="contacts">
        {contacts.map((contact) => (
          <ContactBox 
            key={contact.name}
            name={contact.name}
            link={contact.link}
            linkText={contact.linkText}
            icon={contact.icon}
          />
        ))}
      </section>
    </main>
  )
}

export default Contact