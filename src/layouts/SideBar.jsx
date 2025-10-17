import styles from "./SideBar.module.css";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";

function SideBar({ isSelected, setIsSelected, setShowForm }) {
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
        <button className={styles.delete}>
          <AiOutlineUsergroupDelete size={25} />
        </button>
      )}
    </div>
  );
}

export default SideBar;
