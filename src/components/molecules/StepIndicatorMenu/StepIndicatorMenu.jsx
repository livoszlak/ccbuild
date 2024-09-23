import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styles from "./StepIndicatorMenu.module.css";
import { Label } from '@mui/icons-material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useActiveStep } from '../../../contexts/ActiveStepContext';

export default function StepIndicatorMenu(props) {
    const steps = [
       {
            label: "Generell Information*",
        },
        {
            label: "Egenskaper*"
        },
        {
            label: "Plats / Status / Antal*",
        },
        {
            label: "Produktinformation"
        },
        {
            label: "Marknadsplatsen"
        },
    ];
    const { activeStep, setActiveStep } = useActiveStep();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };     
    return (
    <Box className= {styles.container}>
        <h1 className={styles.stepLabelHeader}>Ny Produkt</h1>
        <Stepper activeStep={activeStep} connector={''} className={styles.mainContainer} orientation="vertical">
            {steps.map((step, index) => (
                <Step styles={styles.stepLabel} key={step.label}>
                <StepLabel StepIconComponent={CheckCircleOutlineIcon} className={styles.StepLabel}>
                {step.label}
                </StepLabel>
                <StepContent>
                <Typography>{step.description}</Typography>
                </StepContent>
            </Step>
            ))}
            <Box className={styles.buttonContainer}>
                <Button
                    sx={{ mt: 1, mr: '8px', borderRadius: '30px' }}
                    >
                    Avbryt
                </Button>
                <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, borderRadius: '30px' }}
                    >
                Spara
                </Button>
            </Box>
        </Stepper>
    </Box>
  );
}

