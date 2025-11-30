import { useContext } from "react";
import "./App.css";
import ContactInfo from "./layouts/ContactInfo";
import ContactList from "./layouts/ContactList";
import Header from "./layouts/Header";
import SideBar from "./layouts/SideBar";
import { AnimatePresence } from "motion/react";

function App() {
  //==================jsx==========================
  return (
    <AnimatePresence mode="wait">
      <Header />
      <div className="main">
        <SideBar />
        <ContactList />
        <ContactInfo />
      </div>
    </AnimatePresence>
  );
}

export default App;
