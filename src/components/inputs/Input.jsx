import { Field } from "formik";
import styles from "./Input.module.css";

function Input({ error, touched, name, disabled }) {
  return (
    <>
      <Field
        disabled={disabled}
        name={name}
        placeholder={name}
        className={`${styles.input} ${
          (styles.input, error && touched ? styles.inputError : "")
        }`}
      />
      {error && touched ? <small>{error}</small> : <small></small>}
    </>
  );
}

export default Input;
