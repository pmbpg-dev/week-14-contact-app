import { useContext, useState } from "react";
import styles from "./SearchFilter.module.css";
import filterContacts from "../../helpers/filterContacts";
import { UiContext } from "../context/UiProvider";
import { UserContext } from "../context/ContactProvider";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useGroups } from "../context/GroupsProvider";
function SearchFilter() {
  // 🗃️====================states================
  const { setContacts } = useContext(UiContext);
  const { store } = useContext(UserContext);
  const [group] = useGroups();
  const [find, setFind] = useState({
    search: "",
    gender: "all",
    groupId: "all",
    favorite: false,
  });
  //💠=============filter and search handler===========
  const changeHandler = (e) => {
    const { name, value } = e.target;
    const updatedFind = { ...find, [name]: value };
    setFind(updatedFind);
    const newContacts = filterContacts(
      store.contacts,
      updatedFind.gender,
      updatedFind.search,
      updatedFind.groupId,
      group.groups,
      find.favorite
    );
    setContacts(newContacts);
  };

  const favoriteHandler = () => {
    setFind({ ...find, favorite: !find.favorite });
    const newContacts = filterContacts(
      store.contacts,
      find.gender,
      find.search,
      find.groupId,
      group.groups,
      !find.favorite
    );
    setContacts(newContacts);
  };
  //==================jsx======================
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search..."
        value={find.search}
        onChange={changeHandler}
        name="search"
      />

      <select name="gender" value={find.gender} onChange={changeHandler}>
        <option value="all">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select name="groupId" onChange={changeHandler}>
        <option value="all">Groups</option>
        {group.groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
      <button className={styles.favorite} onClick={favoriteHandler}>
        {find.favorite ? (
          <FaStar size={25} color="#ffff00" />
        ) : (
          <CiStar size={30} color="#fff" />
        )}
      </button>
    </div>
  );
}

export default SearchFilter;
