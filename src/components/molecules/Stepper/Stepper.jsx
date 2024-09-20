import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// define the number of steps //
const steps = [0,1,2,3,4];

function StepperCard() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
      </Stepper>
      {activeStep === steps.length ? (

        // this Fragment is not exactly necessary for our project, but i left it for now, could be good when testing out the stepper

        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Steg {activeStep + 1} av {steps.length} </Typography>

{/* 
    this is where we want the main content to be located, could have a switch here, like so: 
    
        switch (step) {
            case 0:
                return (
                    <step> content for step 1 </step>
                );
            case 1: 
            return (
                <step> content for step 2</step>
            ); 
        }; 
*/}

        {/* Button section */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Föregående
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Spara' : 'Nästa'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
export default StepperCard
