import "./App.css";
import ContactInfo from "./layouts/ContactInfo";
import ContactList from "./layouts/ContactList";
import Header from "./layouts/Header";
import SideBar from "./layouts/SideBar";
import { useEffect, useState } from "react";

function App() {
  // 🗃️====================states================
  const [selectedContacts, setIsSelectedContacts] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedContact, setSelectedContact] = useState([]);
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });
  // ⬆️==================set data to localStorage================
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  //==================jsx==========================
  return (
    <>
      <Header />
      <div className="main">
        <SideBar
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          selectedContacts={selectedContacts}
          contacts={contacts}
          setContacts={setContacts}
        />
        <ContactList
          contacts={contacts}
          setSelectedContact={setSelectedContact}
          isSelected={isSelected}
          setIsSelectedContacts={setIsSelectedContacts}
          selectedContacts={selectedContacts}
        />
        <ContactInfo
          setSelectedContact={setSelectedContact}
          selectedContact={selectedContact}
          contacts={contacts}
          setContacts={setContacts}
        />
      </div>
    </>
  );
}

export default App;
