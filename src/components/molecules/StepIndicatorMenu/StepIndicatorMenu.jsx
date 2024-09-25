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
                    <Button
                    variant='outlined'
                        sx={{ mt: 1, mr: '8px', borderRadius: '30px', borderWidth: '2px', fontSize: '14px' }}
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