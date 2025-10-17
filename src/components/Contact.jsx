import styles from "./Contact.module.css";
import { FaMale, FaFemale } from "react-icons/fa";

function Contact({ setSelectedContact, contact }) {
  const { name, gender } = contact;
  return (
    <div
      className={styles.container}
      onClick={() => setSelectedContact(contact)}
    >
      <div className={styles.gender}>
        {gender === "male" ? <FaMale /> : <FaFemale />}
      </div>
      <p>{name}</p>
    </div>
  );
}

export default Contact;
