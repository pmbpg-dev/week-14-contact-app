import { UserContext } from "../context/ContactProvider";
import { UiContext } from "../context/UiProvider";
import { useContext } from "react";
import api from "../../api/config";
import styles from "./AddContact.module.css";
import { Form, Formik } from "formik";
import { contactSchema } from "../../validation/validation";
import Input from "../inputs/Input";
import { inputArray } from "../../data/inputArray";
import FormRadio from "../inputs/FormRadio";
import Loader from "../ui/Loader";

function AddContact({
  setShowForm,
  setShowAlert,
  setMessage,
  mode,
  setIsError,
}) {
  const { selectedContact } = useContext(UiContext);
  const { dispatch } = useContext(UserContext);

  const addContactHandler = async (value) => {
    try {
      const create = await api.post("/contacts", value);
      dispatch({ type: "ADD_CONTACT", payload: create });
      setIsError(false);
      setMessage("Add contact successfully!");
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    }
  };
  const editContactHandler = async (value) => {
    try {
      await api.put(`/contacts/${value.id}`, value);
      dispatch({ type: "EDIT_CONTACT", payload: value });
      setIsError(false);
      setMessage("edit contact successfully!");
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    }
  };

  return (
    <div className={styles.conainer}>
      <Formik
        enableReinitialize
        initialValues={
          mode === "Edit"
            ? selectedContact
            : {
                name: "",
                phone: "",
                email: "",
                job: "",
                gender: "",
                fav: false,
              }
        }
        validationSchema={contactSchema}
        onSubmit={async (value) => {
          mode === "Edit"
            ? await editContactHandler(value)
            : await addContactHandler(value);
          setShowAlert(true);
          setShowForm(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.form}>
            <h1>{mode} Contact</h1>
            {inputArray.map((i) => (
              <Input
                key={i.id}
                error={errors[i.name]}
                touched={touched[i.name]}
                name={i.name}
              />
            ))}
            <FormRadio
              error={errors.gender}
              touched={touched.gender}
              name={"gender"}
            />
            <div className={styles.btns}>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button disabled={isSubmitting} type="submit">
                {isSubmitting ? <Loader /> : mode}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default AddContact;
