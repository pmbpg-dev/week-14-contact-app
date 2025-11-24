import { Field } from "formik";
import styles from "./FormRadio.module.css";

function FormRadio({ error, touched, name }) {
  return (
    <>
      <div className={styles.radios}>
        <label>
          <Field type="radio" name={name} value="male" />
          Male
        </label>
        <label>
          <Field type="radio" name={name} value="female" />
          Female
        </label>
      </div>
      {error && touched ? <small>{error}</small> : <small></small>}
    </>
  );
}

export default FormRadio;
