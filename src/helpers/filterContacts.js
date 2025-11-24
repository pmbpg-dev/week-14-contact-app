function filterContacts(contacts, gender, search, groupId, groups, favorite) {
  let newContacts = [];
  // =================filter by group================
  if (groupId !== "all") {
    const selectedGroup = groups.find((g) => g.id === groupId);
    const contactsGroup = contacts.filter((c) =>
      selectedGroup.members.includes(c.id)
    );
    newContacts = contactsGroup;
  } else {
    newContacts = contacts;
  }
  // =================filter by gender================
  if (gender !== "all") {
    newContacts = contacts.filter((contact) => contact.gender === gender);
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
