function filterContacts(contacts, gender, search, favorite) {
  let newContacts = [];
  // =================filter by gender================
  if (gender !== "all") {
    newContacts = contacts.filter((contact) => contact.gender === gender);
  } else {
    newContacts = contacts;
  }
  //===================search contacts name=============
  if (search.trim() !== "") {
    newContacts = newContacts.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    );
    //=====================Favorite=======================
  }
  if (favorite) {
    newContacts = newContacts.filter((contact) => contact.fav === true);
  }
  return newContacts;
}

export default filterContacts;
