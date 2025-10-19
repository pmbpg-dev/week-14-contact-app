function filterContacts(contacts, gender, search) {
  let newContacts = [];
  // =================filter by gender================
  if (gender === "all") {
    newContacts = contacts;
  } else {
    newContacts = contacts.filter((contact) => {
      return contact.gender === gender;
    });
  }
  //===================search contacts name=============
  if (search === "") {
    return newContacts;
  } else {
    newContacts = newContacts.filter((contact) => {
      return contact.name.toLowerCase().includes(search.toLowerCase());
    });
    return newContacts;
  }
}

export default filterContacts;
