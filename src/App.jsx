import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AddressAutofill } from "@mapbox/search-js-react";
import AddressAutofillForm from "./components/AddressAutofillForm";
import Stepper from "./components/molecules/Stepper/Stepper";
import Navbar from "./components/molecules/Navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <AddressAutofillForm /> */}
      <Navbar />
      <Stepper />
    </>
  );
}

export default App;
