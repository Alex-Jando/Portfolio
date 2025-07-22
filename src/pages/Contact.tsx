import { useEffect } from "react";
import ContactBox from "../components/ContactBox";
import { contacts } from "../assets/contacts";

const Contact = () => {

  useEffect(() => {
      document.title = "Contact | Alexander Jando";
    }, [])

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