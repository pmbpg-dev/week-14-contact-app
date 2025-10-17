import Contact from "../components/Contact";
import SearchFilter from "../components/SearchFilter";
import styles from "./ContactList.module.css";

function ContactList({ contacts, setSelectedContact }) {
  return (
    <div className={styles.container}>
      <SearchFilter />
      <div className={styles.contacts}>
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            setSelectedContact={setSelectedContact}
          />
        ))}
      </div>
    </div>
  );
}

export default ContactList;
