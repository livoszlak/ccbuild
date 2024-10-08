import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Textfield from "../../atoms/Textfield/Textfield";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import styles from "./Stepper.module.css";
import RadioButton from "../../atoms/RadioButton/RadioButton";
import Step1 from "../../molecules/Step1/Step1";
import Step2 from "../../molecules/Step2/Step2";
import Step4 from "../../molecules/Step4/Step4";
import { useData } from "../../../contexts/DataContext";
import { useState, useEffect } from "react";
import { useActiveStep } from "../../../contexts/ActiveStepContext";
import Step5 from "../../molecules/Step5/Step5";
import Step3 from "../../molecules/Step3/Step3";
import CustomButton from "../../atoms/CustomButton/CustomButton";

// define the number of steps //
const steps = [0, 1, 2, 3, 4];

function StepperComponent() {
  const { activeStep, setActiveStep } = useActiveStep();
  const { state } = useData();

  // Handlers for step navigation
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 />;
      case 1:
        return (
          <Step2
            selectedSubcategorySecondary={state.selectedSubcategorySecondary}
          />
        );

      case 2:
        return (
          <>
            <Step3/>
          </>
        );
      case 3:
        return (
          <>
            <Step4 />
          </>
        );
      case 4:
        return (
          <>
            <Step5 />
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ width: "100%", marginRight: "120px" }}>
      <Stepper activeStep={activeStep}>
        {/* Add Step components here if needed */}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography
          color="primary"
            sx={{
              mt: "32px",
              mb: 0,
              fontFamily: "Poppins, sans-serif",
              fontWeight: "var(--semibold)",
            }}
          >
            Steg {activeStep + 1} av {steps.length}{" "}
          </Typography>
          {getStepContent(activeStep)}
          <Box 
            sx={{
              display: "flex",
              flexDirection: "row",
              my: '32px',
              pt: '32px',
              justifyContent: "space-between",
              borderTop: '1px solid #E2E2E2',
            }}
          >
            {activeStep !== 0 ? 
            <CustomButton
              variant="outlined"
              onClick={handleBack}
            >
              Föregående
            </CustomButton>
          : 
          <Box/>}
          <Box/>
            <CustomButton onClick={handleNext} 
            variant="contained"
            >
              {activeStep === steps.length - 1 ? "Spara" : "Nästa"}
            </CustomButton>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default StepperComponent;
