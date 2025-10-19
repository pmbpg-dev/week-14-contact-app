import styles from "./ConfirmBox.module.css";

function ConfirmBox({ onConfirm, onCancel, message }) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p>{message}</p>
        <div className={styles.btns}>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBox;
