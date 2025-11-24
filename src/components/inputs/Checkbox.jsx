import { Field } from "formik";

function Checkbox({ id, name, formName, disabled }) {
  return (
    <label>
      <Field disabled={disabled} type="checkbox" name={formName} value={id} />
      {name}
    </label>
  );
}

export default Checkbox;
