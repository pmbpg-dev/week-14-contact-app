import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ContactProvider from "./components/context/ContactProvider.jsx";
import UiProvider from "./components/context/UiProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UiProvider>
      <ContactProvider>
        <App />
      </ContactProvider>
    </UiProvider>
  </StrictMode>
);
