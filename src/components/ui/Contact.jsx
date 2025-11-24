import { useContext, useEffect, useState } from "react";
import styles from "./Contact.module.css";
import { FaMale, FaFemale } from "react-icons/fa";
import { UiContext } from "../context/UiProvider";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useGroups } from "../context/GroupsProvider";
import { getGroupName } from "../../helpers/getGroupName";

function Contact({ contact }) {
  // 🗃️====================state & value================
  const [groups] = useGroups();
  const { setSelectedContact, isSelected, setSelectedId, selectedContact } =
    useContext(UiContext);

  const [selected, setSelected] = useState(false);
  const { name, gender, email, id, fav } = contact;
  const [groupsName, setGroupsName] = useState([]);

  useEffect(() => {
    const getGroups = groups.groups;
    if (getGroups) {
      const gName = getGroupName(getGroups, id);
      setGroupsName(gName);
    }
  }, [groups, id]);
  // ✅======checkbox handler for delete contacts=======

  const changeHandler = () => {
    setSelected(!selected);
    if (!selected) {
      setSelectedId((prev) => [...prev, contact.id]);
    } else {
      setSelectedId((prev) => prev.filter((id) => id !== contact.id));
    }
  };
  // ===================jsx=====================
  return (
    <div
      className={
        id === selectedContact.id ? styles.selectedContainer : styles.container
      }
      onClick={() =>
        !isSelected ? setSelectedContact(contact) : setSelectedContact({})
      }
    >
      {isSelected && (
        <input
          className={styles.checked}
          type="checkbox"
          onChange={changeHandler}
        />
      )}
      <div className={styles.gender}>
        {gender === "male" ? <FaMale size={25} /> : <FaFemale size={25} />}
      </div>
      <div className={styles.info}>
        <p>{name}</p>
        <span>{email}</span>
      </div>
      <div className={styles.groups}>
        {groupsName.map((g) => (
          <span key={g.id}>{g.name}</span>
        ))}
      </div>
      {fav ? (
        <FaStar size={25} color="#fff" className={styles.favorite} />
      ) : (
        <CiStar size={25} color="#fff" className={styles.favorite} />
      )}
    </div>
  );
}

export default Contact;
