import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import api from "../../api/config";

export const GroupsContext = createContext();

const initialState = {
  groups: [],
  loading: true,
  error: "",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_GROUPS":
      return {
        groups: payload,
        loading: false,
        error: "",
      };
    case "CREATE_GROUP":
      return {
        groups: [...state.groups, payload],
        loading: false,
        error: "",
      };
    case "EDIT_GROUP":
      return {
        groups: state.groups.map((group) =>
          String(group.id) === String(payload.id) ? payload : group
        ),
        loading: false,
        error: "",
      };
    case "BULK_DELETE_GROUPS":
      return {
        groups: state.groups.filter(
          (group) => !payload.some((id) => String(group.id) === String(id))
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

function GroupsProvider({ children }) {
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getGroupsApi = () => {
      try {
        api
          .get("/groups")
          .then((data) => dispatch({ type: "LOAD_GROUPS", payload: data }));
      } catch (err) {
        dispatch({ type: "ERROR", payload: err.message });
      }
    };
    getGroupsApi();
  }, []);

  return (
    <GroupsContext.Provider value={{ store, dispatch }}>
      {children}
    </GroupsContext.Provider>
  );
}

const useGroups = () => {
  const { store, dispatch } = useContext(GroupsContext);
  return [store, dispatch];
};

export { useGroups };
export default GroupsProvider;
