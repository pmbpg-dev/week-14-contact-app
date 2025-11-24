import { Form, Formik } from "formik";
import styles from "./CreateGroup.module.css";
import { groupSchema } from "../../validation/validation";
import Input from "../inputs/Input";
import Loader from "../ui/Loader";
import { useContext } from "react";
import { UserContext } from "../context/ContactProvider";
import Checkbox from "../inputs/Checkbox";
import { useGroups } from "../context/GroupsProvider";
import api from "../../api/config";

function CreateGroup({ setIsCreate, setShowAlert, setMessage, setIsError }) {
  const { store } = useContext(UserContext);
  const [, dispatch] = useGroups();

  const createHandler = async (value) => {
    try {
      const create = await api.post("/groups", value);
      dispatch({ type: "CREATE_GROUP", payload: create });
      setIsError(false);
      setMessage("Group created successfully!");
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    }
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          name: "",
          members: [],
        }}
        validationSchema={groupSchema}
        onSubmit={async (value) => {
          await createHandler(value);
          setShowAlert(true);
          setIsCreate(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.form}>
            <h1>Create Group</h1>
            <Input error={errors.name} touched={touched.name} name="name" />
            <div className={styles.checkbox}>
              {store.contacts.map((contact) => (
                <Checkbox
                  key={contact.id}
                  id={contact.id}
                  name={contact.name}
                  formName="members"
                />
              ))}
            </div>
            {errors.members && touched.members ? (
              <small>{errors.members}</small>
            ) : (
              <small></small>
            )}
            <div className={styles.btns}>
              <button type="button" onClick={() => setIsCreate(false)}>
                Cancel
              </button>
              <button disabled={isSubmitting} type="submit">
                {isSubmitting ? <Loader /> : "Create"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateGroup;
