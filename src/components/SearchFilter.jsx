import { useState } from "react";
import styles from "./SearchFilter.module.css";
import filterContacts from "../helpers/filterContacts";

function SearchFilter({ contacts, setShowContacts }) {
  // 🗃️====================states================
  const [find, setFind] = useState({
    search: "",
    gender: "all",
  });
  //💠=============filter and search handler===========
  const changeHandler = (e) => {
    const { name, value } = e.target;
    const updatedFind = { ...find, [name]: value };
    setFind(updatedFind);
    const newContacts = filterContacts(
      contacts,
      updatedFind.gender,
      updatedFind.search
    );
    setShowContacts(newContacts);
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
        <option value="all">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
}

export default SearchFilter;
