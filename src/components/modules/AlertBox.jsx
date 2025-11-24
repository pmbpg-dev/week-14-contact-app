import styles from "./AlertBox.module.css";

function AlertBox({ text, isError }) {
  return (
    <div className={styles.alertContainer}>
      <p>
        <span
          style={
            isError
              ? { backgroundColor: "#FF0000" }
              : { backgroundColor: "#1bb659" }
          }
        >
          {isError ? "✕" : "✓"}
        </span>
        {text}
      </p>
    </div>
  );
}

export default AlertBox;
