import "./App.css";
import ContactInfo from "./layouts/ContactInfo";
import ContactList from "./layouts/ContactList";
import Header from "./layouts/Header";
import SideBar from "./layouts/SideBar";
import { useState } from "react";

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
