import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Textfield from '../../atoms/Textfield/Textfield';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import styles from './Stepper.module.css';

// define the number of steps //
const steps = [0, 1, 2, 3, 4];
const options = {
  option1: "Value 1",
  option2: "Value 2",
  option3: "Value 3"
};
const options2 = {
  option1: "Value 1",
  option2: "Value 2",
  option3: "Value 3"
};
const options3 = {
  option1: "Value 1",
  option2: "Value 2",
  option3: "Value 3"
};

function StepperComponent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedCategory, setCategory] = React.useState('');
  const [selectedSubCategory, setSubCategory] = React.useState('');
  const [selectedSubcategory2, setSubCategory2] = React.useState('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleCategoryChange= (setter) => (value) => {
    setter(value);
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <h1>Generell Information</h1>
            <Textfield title="Projekt" id="project" placeholder="projektnamn" />
            <h2>Produktnamn</h2>
            <Box className={styles.dropdownContainer}>
            <Dropdown
              id="category"
              placeholder="Produktnamn"
              options={options}
              onOptionChange={handleCategoryChange(setCategory)}
            />
            {selectedCategory && (
              <Dropdown
                id="subcategory1"
                placeholder="Produktnamn"
                options={options2}
                onOptionChange={handleCategoryChange(setSubCategory)}
              />
            )}
            {selectedSubCategory && (
              <Dropdown
                id="subcategory2"
                placeholder="Produktnamn"
                options={options3}
                onOptionChange={handleCategoryChange(setSubCategory2)}
              />
            )}
            </Box>
            <Textfield title="Eget Id-nummer" id="x" placeholder="EgetIdNummer" />
            <Textfield title="Produktbeskrivning" id="ProductDescription" placeholder="ProduktBeskrivning" />
          </>
        );
      case 1:
        return (
          <>
            <h1>Plats / Status / Antal</h1>
          </>
        );
      case 2:
        return (
          <>
            <h1>Egenskaper</h1>
            <h1>Form</h1>
          </>
        );
      case 3:
        return (
          <>
            <h1>Produktinformation</h1>
          </>
        );
      case 4:
        return (
          <>
            <h1>Marknadsplatsen</h1>
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {/* Add Step components here if needed */}
      </Stepper>
      {activeStep === steps.length ? (
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
          {getStepContent(activeStep)}
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

export default StepperComponent;