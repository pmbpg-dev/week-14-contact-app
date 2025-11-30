import { useContext, useEffect } from "react";
import Contact from "../components/ui/Contact";
import SearchFilter from "../components/ui/SearchFilter";
import styles from "./ContactList.module.css";
import { UserContext } from "../components/context/ContactProvider";
import { UiContext } from "../components/context/UiProvider";
import { motion, stagger } from "motion/react";
import { animate } from "motion";

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
          contacts.map((contact, i) => (
            <motion.div
              key={contact.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Contact contact={contact} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default ContactList;
