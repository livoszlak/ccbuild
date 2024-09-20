import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AddressAutofill } from "@mapbox/search-js-react";
import AddressAutofillForm from "./components/AddressAutofillForm";
import Stepper from "./components/molecules/Stepper/Stepper";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <AddressAutofillForm /> */}
      <Stepper />
    </>
  );
}

export default App;
