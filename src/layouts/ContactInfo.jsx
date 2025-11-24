import { useState, useEffect, useContext } from "react";
import styles from "./ContactInfo.module.css";
import { FaMale, FaFemale } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import AlertBox from "../components/modules/AlertBox";
import ConfirmBox from "../components/modules/ConfirmBox";
import AddContact from "../components/modules/AddContact";
import { UserContext } from "../components/context/ContactProvider";
import api from "../api/config";
import { UiContext } from "../components/context/UiProvider";
function ContactInfo() {
  // 🗃️====================states================
  const { dispatch } = useContext(UserContext);
  const { selectedContact, setSelectedContact } = useContext(UiContext);
  const [confirm, setConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { gender, name, email, phone, job, id, fav } = selectedContact;
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
  const confirmDeleteHandler = async () => {
    try {
      await api.delete(`/contacts/${selectedContact.id}`);
      dispatch({ type: "DELETE_CONTACT", payload: selectedContact.id });
      setConfirm(false);
      setIsError(false);
      setMessage("delete contact successfully!");
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    }
    setShowAlert(true);
    setSelectedContact({});
  };
  //================Add to favorite ===================
  const favoriteHandler = () => {
    const update = { ...selectedContact, fav: !selectedContact.fav };
    api.put(`/contacts/${update.id}`, update);
    dispatch({ type: "EDIT_CONTACT", payload: update });
    setSelectedContact({ ...selectedContact, fav: !selectedContact.fav });
  };
  //==================jsx=========================
  if (Object.keys(selectedContact).length === 0)
    return (
      <div className={styles.noselected}>
        Not Selected
        {showAlert && <AlertBox text={message} isError={isError} />}
      </div>
    );
  return (
    <div className={styles.container} key={id}>
      <div className={styles.profileBox}>
        <div className={styles.profileInfo}>
          <div className={styles.gender}>
            {gender === "male" ? <FaMale size={30} /> : <FaFemale size={30} />}
          </div>
          <div className={styles.name}>
            <p>{name}</p>
            <p>{email}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.edit} onClick={() => setShowForm(true)}>
            Edit
          </button>
          <button className={styles.favorite} onClick={favoriteHandler}>
            {fav ? (
              <FaStar size={25} color="#ffff00" />
            ) : (
              <CiStar size={30} color="#fff" />
            )}
          </button>
        </div>
      </div>
      <span className={styles.info}>{phone}</span>
      <span className={styles.info}>{email}</span>
      <span className={styles.info}>{job}</span>
      <span className={styles.info}>{gender}</span>
      <button className={styles.delete} onClick={() => setConfirm(true)}>
        Delete
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
          setShowForm={setShowForm}
          setShowAlert={setShowAlert}
          setMessage={setMessage}
          setIsError={setIsError}
        />
      )}
    </div>
  );
}

export default ContactInfo;
