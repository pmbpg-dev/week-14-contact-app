import styles from "./AddContact.module.css";
import { useEffect, useState } from "react";
import validateForm from "../helpers/validateForm";

function AddContact({
  setShowForm,
  setContacts,
  contacts,
  setShowAlert,
  setMessage,
  mode,
  editingContact,
  setSelectedContact,
}) {
  // 🗃️====================states================
  const [form, setForm] = useState(
    mode === "Edit"
      ? editingContact
      : { id: 0, name: "", email: "", phone: "", job: "", gender: "male" }
  );
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    job: "",
  });
  //=============set contact in state for edit============
  useEffect(() => {
    if (mode === "Edit" && editingContact) {
      setForm(editingContact);
    }
  }, [editingContact, mode]);

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
    const hasEmpty = Object.values(form).some((value) => value === "");
    if (hasEmpty) return;
    //-----------add new contact----------------
    if (mode === "Add") {
      const newContact = {
        ...form,
        id: contacts.length + 1,
      };
      setContacts([...contacts, newContact]);
      setMessage("Add contact successfully!");
    }
    // -------------edit selected contact----------
    else {
      const updatedContacts = contacts.map((contact) => {
        if (contact.id === form.id) {
          setMessage("edit contact successfully!");
          setSelectedContact(form);
          return form;
        } else {
          return contact;
        }
      });
      setContacts(updatedContacts);
    }
    setShowAlert(true);
    setShowForm(false);
  };
  //==================jsx========================
  return (
    <div className={styles.conainer}>
      <div className={styles.form}>
        <p>{mode} Contact</p>
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
