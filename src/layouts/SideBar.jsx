import { useEffect, useState } from "react";
import styles from "./SideBar.module.css";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import ConfirmBox from "../components/ui/ConfirmBox";
import AlertBox from "../components/ui/AlertBox";
import AddContact from "../pages/AddContact";

function SideBar({
  isSelected,
  setIsSelected,
  selectedContacts,
  contacts,
  setContacts,
}) {
  // ==============states==================
  const [confirm, setConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  // ================clear Alert==================
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // 🗑️====================delete selected contacts================
  const confirmDeleteHandler = () => {
    const newContact = contacts.filter(
      (contact) => !selectedContacts.some((c) => c.id === contact.id)
    );
    setContacts(newContact);
    setConfirm(false);
    setMessage("delete contacts successfully!");
    setShowAlert(true);
    setIsSelected(false);
  };
  //==================jsx===================================
  return (
    <div className={styles.container}>
      <button className={styles.btns} onClick={() => setShowForm(true)}>
        <RiUserAddLine size={25} />
      </button>
      <button
        className={styles.btns}
        onClick={() => setIsSelected(!isSelected)}
      >
        {isSelected ? "Cancel" : "Select"}
      </button>
      {isSelected && (
        <button
          className={styles.delete}
          onClick={() => selectedContacts.length && setConfirm(true)}
        >
          <AiOutlineUsergroupDelete size={25} />
        </button>
      )}
      {confirm && (
        <ConfirmBox
          message="Are you sure to delete contacts?"
          onConfirm={confirmDeleteHandler}
          onCancel={() => setConfirm(false)}
        />
      )}
      {showAlert && <AlertBox text={message} />}
      {showForm && (
        <AddContact
          setShowForm={setShowForm}
          contacts={contacts}
          setContacts={setContacts}
          setShowAlert={setShowAlert}
          setMessage={setMessage}
          mode="Add"
        />
      )}
    </div>
  );
}

export default SideBar;
