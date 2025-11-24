import { useEffect, useState } from "react";
import styles from "./GroupBtn.module.css";
import CreateGroup from "../modules/CreateGroup";
import DeleteGroup from "../modules/DeleteGroup";
import AlertBox from "../modules/AlertBox";
import EditGroup from "../modules/EditGroup";

function GroupBtn() {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  // ================clear Alert==================
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className={styles.groupsBtn}>
      <button onClick={() => setIsCreate(true)} className={styles.btns}>
        Create Group
      </button>
      <button onClick={() => setIsEdit(true)} className={styles.btns}>
        Edit Group
      </button>
      <button onClick={() => setIsDelete(true)} className={styles.delete}>
        Delete Group
      </button>

      {isCreate && (
        <CreateGroup
          setIsCreate={setIsCreate}
          setIsError={setIsError}
          setMessage={setMessage}
          setShowAlert={setShowAlert}
        />
      )}
      {isDelete && (
        <DeleteGroup
          setIsDelete={setIsDelete}
          setIsError={setIsError}
          setMessage={setMessage}
          setShowAlert={setShowAlert}
        />
      )}
      {isEdit && (
        <EditGroup
          setIsEdit={setIsEdit}
          setIsError={setIsError}
          setMessage={setMessage}
          setShowAlert={setShowAlert}
        />
      )}
      {showAlert && <AlertBox text={message} isError={isError} />}
    </div>
  );
}

export default GroupBtn;
