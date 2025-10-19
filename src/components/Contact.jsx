import { useState } from "react";
import styles from "./Contact.module.css";
import { FaMale, FaFemale } from "react-icons/fa";

function Contact({
  setSelectedContact,
  contact,
  isSelected,
  setIsSelectedContacts,
}) {
  // 🗃️====================state & value================
  const [selected, setSelected] = useState(false);
  const { name, gender } = contact;
  // ✅======checkbox handler for delete contacts=======
  const changeHandler = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    if (newSelected) {
      setIsSelectedContacts((prev) => [...prev, contact]);
    } else {
      setIsSelectedContacts((prev) => prev.filter((c) => c.id !== contact.id));
    }
  };
  // ===================jsx=====================
  return (
    <div
      className={styles.container}
      onClick={() => setSelectedContact(contact)}
    >
      {isSelected && (
        <input
          className={styles.checked}
          type="checkbox"
          onChange={changeHandler}
        />
      )}
      <div className={styles.gender}>
        {gender === "male" ? <FaMale /> : <FaFemale />}
      </div>
      <p>{name}</p>
    </div>
  );
}

export default Contact;
