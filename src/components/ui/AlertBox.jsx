import styles from "./AlertBox.module.css";

function AlertBox({ text }) {
  return (
    <div className={styles.container}>
      <p>
        <span>✓</span>
        {text}
      </p>
    </div>
  );
}

export default AlertBox;
