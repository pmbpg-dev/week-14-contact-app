import styles from "./ContactInfo.module.css";
import { FaMale, FaFemale } from "react-icons/fa";
import { LuUserRoundMinus } from "react-icons/lu";

function ContactInfo({ selectedContact }) {
  const { gender, name, email, phone, job } = selectedContact;
  console.log(selectedContact.lenght);
  if (selectedContact.length === 0)
    return <div className={styles.noselected}>Not Selected</div>;
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
        <button className={styles.edit}>Edit</button>
      </div>
      <span className={styles.info}>{phone}</span>
      <span className={styles.info}>{email}</span>
      <span className={styles.info}>{job}</span>
      <span className={styles.info}>{gender}</span>
      <button className={styles.delete}>
        <LuUserRoundMinus />
      </button>
    </div>
  );
}

export default ContactInfo;
