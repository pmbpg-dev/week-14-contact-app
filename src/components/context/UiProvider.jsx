import { createContext, useState } from "react";

export const UiContext = createContext();

function UiProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});

  const value = {
    contacts,
    setContacts,
    isSelected,
    setIsSelected,
    selectedId,
    setSelectedId,
    selectedContact,
    setSelectedContact,
  };
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export default UiProvider;
