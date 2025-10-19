import { useState, useEffect } from "react";
import styles from "./ContactInfo.module.css";
import { FaMale, FaFemale } from "react-icons/fa";
import { LuUserRoundMinus } from "react-icons/lu";
import AlertBox from "../components/ui/AlertBox";
import ConfirmBox from "../components/ui/ConfirmBox";
import AddContact from "../pages/AddContact";

function ContactInfo({
  selectedContact,
  contacts,
  setContacts,
  setSelectedContact,
}) {
  // 🗃️====================states================
  const [confirm, setConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const { gender, name, email, phone, job } = selectedContact;
  // ================clear Alert==================
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  // 🗑️====================delete selected contact================
  const confirmDeleteHandler = () => {
    const newContacts = contacts.filter((con) => con.id !== selectedContact.id);
    setContacts(newContacts);
    setSelectedContact([]);
    setConfirm(false);
    setShowAlert(true);
  };

  //==================jsx=========================
  if (selectedContact.length === 0)
    return (
      <div className={styles.noselected}>
        Not Selected
        {showAlert && <AlertBox text="delete contact successfully!" />}
      </div>
    );
  return (
    <div className={styles.container}>
      <div className={styles.profileBox}>
        <div className={styles.profileInfo}>
          <div className={styles.gender}>
            {gender === "male" ? <FaMale size={25} /> : <FaFemale size={25} />}
          </div>
          <div className={styles.name}>
            <p>{name}</p>
            <p>{email}</p>
          </div>
        </div>
        <button className={styles.edit} onClick={() => setShowForm(true)}>
          Edit
        </button>
      </div>
      <span className={styles.info}>{phone}</span>
      <span className={styles.info}>{email}</span>
      <span className={styles.info}>{job}</span>
      <span className={styles.info}>{gender}</span>
      <button className={styles.delete} onClick={() => setConfirm(true)}>
        <LuUserRoundMinus />
      </button>
      {confirm && (
        <ConfirmBox
          message="Are you sure to delete this contact?"
          onConfirm={confirmDeleteHandler}
          onCancel={() => setConfirm(false)}
        />
      )}
      {showAlert && <AlertBox text={message} />}
      {showForm && (
        <AddContact
          mode="Edit"
          editingContact={selectedContact}
          setShowForm={setShowForm}
          setContacts={setContacts}
          contacts={contacts}
          setShowAlert={setShowAlert}
          setMessage={setMessage}
          setSelectedContact={setSelectedContact}
        />
      )}
    </div>
  );
}

export default ContactInfo;
