import { useContext } from "react";
import "./App.css";
import ContactInfo from "./layouts/ContactInfo";
import ContactList from "./layouts/ContactList";
import Header from "./layouts/Header";
import SideBar from "./layouts/SideBar";

function App() {
  //==================jsx==========================
  return (
    <>
      <Header />
      <div className="main">
        <SideBar />
        <ContactList />
        <ContactInfo />
      </div>
    </>
  );
}

export default App;
