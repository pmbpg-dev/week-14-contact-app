import { UserContext } from "../components/context/ContactProvider";
import { UiContext } from "../components/context/UiProvider";
import { useContext, useEffect, useState } from "react";
import validateForm from "../helpers/validateForm";
import api from "../api/config";
import styles from "./AddContact.module.css";

function AddContact({ setShowForm, setShowAlert, setMessage, mode }) {
  // 🗃️====================states================
  const { selectedContact } = useContext(UiContext);
  const { dispatch } = useContext(UserContext);
  const [form, setForm] = useState(
    mode === "Edit"
      ? selectedContact
      : { name: "", email: "", phone: "", job: "", gender: "male", fav: false }
  );
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    job: "",
  });
  //=============set contact in state for edit============
  useEffect(() => {
    if (mode === "Edit" && selectedContact) {
      setForm(selectedContact);
    }
  }, [selectedContact, mode]);

  // 💠=========== form input event handle================
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((form) => ({ ...form, [name]: value }));
    // ------validate form------
    const errMsg = validateForm(name, value);
    setErrors((errors) => ({ ...errors, [name]: errMsg }));
  };
  // 💾=============save contact to state==============
  const addHandler = () => {
    //------validate info before adding------------
    const newErrors = {};
    for (let i in form) {
      const errMsg = validateForm(i, form[i]);
      newErrors[i] = errMsg;
    }
    setErrors(newErrors);
    const hasEmpty = Object.values(form).some((value) => value === "");
    if (hasEmpty) return;
    //-----------add new contact----------------
    if (mode === "Add") {
      const addContact = async () => {
        try {
          const create = await api.post("/contacts", form);
          dispatch({ type: "ADD_CONTACT", payload: create });
          setMessage("Add contact successfully!");
        } catch (err) {
          setMessage(err.message);
        }
      };
      addContact();
    }
    // -------------edit selected contact----------
    else {
      try {
        api.put(`/contacts/${form.id}`, form);
        dispatch({ type: "EDIT_CONTACT", payload: form });
        setMessage("edit contact successfully!");
      } catch (err) {
        setMessage(err.message);
      }
    }
    setShowAlert(true);
    setShowForm(false);
  };

  //==================jsx========================
  return (
    <div className={styles.conainer}>
      <div className={styles.form}>
        <p className={styles.header}>{mode} Contact</p>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={changeHandler}
        />
        <small>{errors.name}</small>
        <input
          type="phone"
          placeholder="Phone"
          name="phone"
          value={form.phone}
          onChange={changeHandler}
        />
        <small>{errors.phone}</small>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={changeHandler}
        />
        <small>{errors.email}</small>
        <input
          type="text"
          placeholder="Job"
          name="job"
          value={form.job}
          onChange={changeHandler}
        />
        <small>{errors.job}</small>
        <div className={styles.gender}>
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            name="gender"
            value="male"
            id="male"
            onChange={changeHandler}
            checked={form.gender === "male"}
          />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            name="gender"
            value="female"
            id="female"
            onChange={changeHandler}
            checked={form.gender === "female"}
          />
        </div>
        <div className={styles.btns}>
          <button onClick={() => setShowForm(false)}>Cancel</button>
          <button onClick={addHandler}>{mode}</button>
        </div>
      </div>
    </div>
  );
}

export default AddContact;
