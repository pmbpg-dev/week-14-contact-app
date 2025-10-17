import styles from "./SearchFilter.module.css";

function SearchFilter() {
  return (
    <div className={styles.container}>
      <input type="text" placeholder="Search..." />
      <select>
        <option>All</option>
        <option>Male</option>
        <option>Female</option>
      </select>
    </div>
  );
}

export default SearchFilter;
