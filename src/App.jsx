import "./App.css";
import ContactInfo from "./layouts/ContactInfo";
import ContactList from "./layouts/ContactList";
import Header from "./layouts/Header";
import SideBar from "./layouts/SideBar";
import { useState } from "react";
import AddContact from "./pages/AddContact";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState([]);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "ali",
      email: "aliahmadi@gmail.com",
      phone: "09195559978",
      job: "programmer",
      gender: "male",
    },
  ]);

  return (
    <>
      <Header />
      <div className="main">
        <SideBar
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          setShowForm={setShowForm}
        />
        <ContactList
          contacts={contacts}
          setSelectedContact={setSelectedContact}
        />
        <ContactInfo selectedContact={selectedContact} />
      </div>
      {showForm && <AddContact />}
    </>
  );
}

export default App;
