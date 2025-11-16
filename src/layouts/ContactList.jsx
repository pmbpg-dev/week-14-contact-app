import { useContext, useEffect } from "react";
import Contact from "../components/Contact";
import SearchFilter from "../components/SearchFilter";
import styles from "./ContactList.module.css";
import { UserContext } from "../components/context/ContactProvider";
import { UiContext } from "../components/context/UiProvider";

function ContactList() {
  // ==============state================
  const { contacts, setContacts } = useContext(UiContext);
  const { store } = useContext(UserContext);
  // ================set contacts to show list============
  useEffect(() => {
    setContacts(store.contacts);
  }, [store]);
  // ===================jsx=============
  return (
    <div className={styles.container}>
      <SearchFilter />
      <div className={styles.contacts}>
        {contacts.length === 0 ? (
          <p className={styles.empty}>No Contacts</p>
        ) : (
          contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))
        )}
      </div>
    </div>
  );
}

export default ContactList;
