import { useContext, useState } from "react";
import { useGroups } from "../context/GroupsProvider";
import styles from "./EditGroup.module.css";
import { Form, Formik } from "formik";
import Input from "../inputs/Input";
import { UserContext } from "../context/ContactProvider";
import Checkbox from "../inputs/Checkbox";
import Loader from "../ui/Loader";
import { groupSchema } from "../../validation/validation";
import api from "../../api/config";

function EditGroup({ setIsEdit, setIsError, setMessage, setShowAlert }) {
  const { store } = useContext(UserContext);
  const [groups, dispatch] = useGroups();
  const [selectedGroup, setSelectedGroup] = useState({});

  const selectGroupHandler = (e) => {
    const group = groups.groups.find((g) => g.id === e.target.value);
    setSelectedGroup(group);
  };

  const editHandler = async (value) => {
    try {
      await api.put(`/groups/${value.id}`, value);
      dispatch({ type: "EDIT_GROUP", payload: value });
      setIsError(false);
      setMessage("edit group successfully!");
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Edit Group</h1>
        <select onChange={selectGroupHandler}>
          <option value="group">Select Group</option>
          {groups.groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <Formik
          enableReinitialize
          initialValues={{
            id: selectedGroup?.id || "",
            name: selectedGroup?.name || "",
            members: selectedGroup?.members || [],
          }}
          validationSchema={groupSchema}
          onSubmit={async (value) => {
            await editHandler(value);
            setShowAlert(true);
            setIsEdit(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={styles.formikForm}>
              <Input
                disabled={!selectedGroup?.id}
                error={errors.name}
                touched={touched.name}
                name={"name"}
              />
              <div className={styles.checkbox}>
                {store.contacts.map((contact) => (
                  <Checkbox
                    disabled={!selectedGroup?.id}
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
                <button type="button" onClick={() => setIsEdit(false)}>
                  Cancel
                </button>
                <button
                  disabled={!selectedGroup?.id || isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? <Loader /> : "Edit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditGroup;
