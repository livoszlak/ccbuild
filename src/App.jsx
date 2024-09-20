import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AddressAutofill } from "@mapbox/search-js-react";
import AddressAutofillForm from "./components/AddressAutofillForm";
import StepperComponent from "./components/molecules/Stepper/StepperComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <StepperComponent/>
      {/* <AddressAutofillForm /> */}
    </>
  );
}

export default App;
