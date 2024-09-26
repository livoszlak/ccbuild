import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "./StepIndicatorMenu.module.css";
import { useActiveStep } from '../../../contexts/ActiveStepContext';
import StepIcon from '../../atoms/StepIcon/StepIcon';
import CustomButton from '../../atoms/CustomButton/CustomButton';

export default function StepIndicatorMenu() {
    const steps = [
        { label: "Generell information*" },
        { label: "Egenskaper*" },
        { label: "Plats / Status / Antal*" },
        { label: "Produktinformation" },
        { label: "Hantering för marknadsplats" },
    ];

    const { activeStep, setActiveStep } = useActiveStep();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <Box className={styles.container}>
            <h1 className={styles.stepLabelHeader}>Ny produkt</h1>
            <Stepper activeStep={activeStep} connector={''} className={styles.mainContainer} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel StepIconComponent={StepIcon} sx={{p:0}}>
                            <p className={styles.StepLabelText}>{step.label}</p>
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                        </StepContent>
                    </Step>
                ))}
                <Box className={styles.buttonContainer}>
                    <CustomButton
                    variant='outlined'
                    >
                        Avbryt
                    </CustomButton>
                    <CustomButton
                        variant="contained"
                        onClick={handleNext}
                    >
                        Spara
                    </CustomButton>
                </Box>
            </Stepper>
        </Box>
    );
}