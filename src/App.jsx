import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.css";
import { AddressAutofill } from "@mapbox/search-js-react";
import AddressAutofillForm from "./components/AddressAutofillForm";
import Stepper from "./components/organisms/Stepper/Stepper";
import Navbar from "./components/molecules/Navbar/Navbar";
import StepIndicatorMenu from "./components/molecules/StepIndicatorMenu/StepIndicatorMenu";
import Box from "@mui/material/Box";
import { ActiveStepProvider } from "./contexts/ActiveStepContext";
import Footer from "./components/molecules/Footer/Footer";

function App() {
  return (
    <>
      <ActiveStepProvider>
        <Navbar />
        <Box className={styles.mainContentContainer}>
          <StepIndicatorMenu />
          <Stepper />
        </Box>
        <Footer />
      </ActiveStepProvider>
    </>
  );
}

export default App;
