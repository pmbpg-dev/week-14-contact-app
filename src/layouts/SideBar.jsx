import { useContext, useEffect, useState } from "react";
import styles from "./SideBar.module.css";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import ConfirmBox from "../components/modules/ConfirmBox";
import AlertBox from "../components/modules/AlertBox";
import AddContact from "../components/modules/AddContact";
import { UiContext } from "../components/context/UiProvider";
import api from "../api/config";
import { UserContext } from "../components/context/ContactProvider";
import GroupBtn from "../components/ui/GroupBtn";

function SideBar() {
  // ==============states==================
  const {
    isSelected,
    setIsSelected,
    selectedId,
    setSelectedId,
    setSelectedContact,
  } = useContext(UiContext);
  const { dispatch } = useContext(UserContext);
  const [confirm, setConfirm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // ================clear Alert==================
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showAlert, selectedId]);

  // 🗑️====================delete selected contacts================
  const confirmDeleteHandler = () => {
    try {
      selectedId.map(async (id) => {
        await api.delete(`/contacts/${id}`);
      });
      dispatch({ type: "BULK_DELETE_CONTACTS", payload: selectedId });
      setConfirm(false);
      setIsError(false);
      setMessage("delete contacts successfully!");
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    }
    setShowAlert(true);
    setIsSelected(false);
  };
  const showDeleteHandler = () => {
    setSelectedContact([]);
    setIsSelected((prev) => {
      const newState = !prev;
      if (newState) setSelectedId([]);
      return newState;
    });
  };
  //==================jsx===================================
  return (
    <div className={styles.container}>
      <button className={styles.btns} onClick={() => setShowForm(true)}>
        <RiUserAddLine size={25} />
      </button>
      <button className={styles.btns} onClick={showDeleteHandler}>
        {isSelected ? "Cancel" : "Select"}
      </button>
      {isSelected && (
        <button
          className={styles.delete}
          onClick={() => (selectedId.length ? setConfirm(true) : null)}
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
      <GroupBtn />
      {showAlert && <AlertBox text={message} isError={isError} />}
      {showForm && (
        <AddContact
          setShowForm={setShowForm}
          setShowAlert={setShowAlert}
          setMessage={setMessage}
          setIsError={setIsError}
          mode="Add"
        />
      )}
    </div>
  );
}

export default SideBar;
