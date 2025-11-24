import { useEffect, useReducer } from "react";
import { createContext } from "react";
import api from "../../api/config";

export const UserContext = createContext();

const initialState = {
  contacts: [],
  loading: true,
  error: "",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_CONTACTS":
      return {
        contacts: payload,
        loading: false,
        error: "",
      };
    case "ADD_CONTACT":
      return {
        contacts: [...state.contacts, payload],
        loading: false,
        error: "",
      };
    case "DELETE_CONTACT":
      return {
        contacts: state.contacts.filter(
          (contact) => String(contact.id) !== String(payload)
        ),
        loading: false,
        error: "",
      };
    case "EDIT_CONTACT":
      return {
        contacts: state.contacts.map((cnt) =>
          String(cnt.id) === String(payload.id) ? payload : cnt
        ),
        loading: false,
        error: "",
      };
    case "BULK_DELETE_CONTACTS":
      return {
        contacts: state.contacts.filter(
          (contact) => !payload.some((id) => String(contact.id) === String(id))
        ),
        loading: false,
        error: "",
      };
    case "ERROR":
      return {
        ...state,
        error: `${payload}`,
      };
    default:
      return state;
  }
};

function ContactProvider({ children }) {
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getContactsApi = () => {
      try {
        api
          .get("/contacts")
          .then((data) => dispatch({ type: "LOAD_CONTACTS", payload: data }));
      } catch (err) {
        dispatch({ type: "ERROR", payload: err.message });
      }
    };
    getContactsApi();
  }, []);
  return (
    <UserContext.Provider value={{ store, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default ContactProvider;
