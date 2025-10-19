import { useEffect, useState } from "react";
import Contact from "../components/Contact";
import SearchFilter from "../components/SearchFilter";
import styles from "./ContactList.module.css";

function ContactList({
  contacts,
  setSelectedContact,
  isSelected,
  setIsSelectedContacts,
  selectedContacts,
}) {
  // ==============state================
  const [showContacts, setShowContacts] = useState([]);
  // ================set contacts to show list============
  useEffect(() => {
    setShowContacts(contacts);
  }, [contacts]);
  // ===================jsx=============
  return (
    <div className={styles.container}>
      <SearchFilter contacts={contacts} setShowContacts={setShowContacts} />
      <div className={styles.contacts}>
        {showContacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            setSelectedContact={setSelectedContact}
            isSelected={isSelected}
            setIsSelectedContacts={setIsSelectedContacts}
            selectedContacts={selectedContacts}
          />
        ))}
      </div>
    </div>
  );
}

export default ContactList;
