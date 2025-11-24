import { array, object } from "yup";
import { useGroups } from "../context/GroupsProvider";
import Checkbox from "../inputs/Checkbox";
import Loader from "../ui/Loader";
import styles from "./DeleteGroup.module.css";
import { Form, Formik } from "formik";
import api from "../../api/config";

function DeleteGroup({ setIsDelete, setShowAlert, setMessage, setIsError }) {
  const [store, dispatch] = useGroups();

  const deleteHandler = async (value) => {
    try {
      value.selectedGroups.map(async (id) => {
        await api.delete(`/groups/${id}`);
      });
      dispatch({ type: "BULK_DELETE_GROUPS", payload: value.selectedGroups });
      setIsError(false);
      setMessage("Group Delete successfully!");
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    }
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          selectedGroups: [],
        }}
        validationSchema={object().shape({
          selectedGroups: array().min(1, "Please select at least one group"),
        })}
        onSubmit={async (value) => {
          await deleteHandler(value);
          setShowAlert(true);
          setIsDelete(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.form}>
            <h1>Delete Groups</h1>
            <h3>Select Groups to delete </h3>
            <div className={styles.checkbox}>
              {store.groups.map((group) => (
                <Checkbox
                  key={group.id}
                  id={group.id}
                  name={group.name}
                  formName="selectedGroups"
                />
              ))}
            </div>
            {errors.selectedGroups && touched.selectedGroups ? (
              <small>{errors.selectedGroups}</small>
            ) : (
              <small></small>
            )}
            <div className={styles.btns}>
              <button type="button" onClick={() => setIsDelete(false)}>
                Cancel
              </button>
              <button disabled={isSubmitting} type="submit">
                {isSubmitting ? <Loader /> : "Delete"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default DeleteGroup;
