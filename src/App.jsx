import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AddressAutofill } from "@mapbox/search-js-react";
import AddressAutofillForm from "./components/AddressAutofillForm";
import Stepper from "./components/organisms/Stepper/Stepper";
import Navbar from "./components/molecules/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Stepper />
    </>
  );
}

export default App;
