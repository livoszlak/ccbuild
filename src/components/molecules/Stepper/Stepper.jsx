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
import { useData } from "../../../contexts/DataContext";
import { useState, useMemo, useEffect } from "react";

// define the number of steps //
const steps = [0, 1, 2, 3, 4];

const options = {
  option1: "Value 1",
  option2: "Value 2",
  option3: "Value 3",
};
const options2 = {
  option1: "Value 1",
  option2: "Value 2",
  option3: "Value 3",
};
const options3 = {
  option1: "Value 1",
  option2: "Value 2",
  option3: "Value 3",
};

const weightUnits = {
  option1: "Value 1",
  option2: "Value 2",
  option3: "Value 3",
};
const measurementUnits = {
  option1: "Value 1",
  option2: "Value 2",
  option3: "Value 3",
};

function StepperComponent() {
  /*   const [selectedCategory, setCategory] = React.useState("");
  const [selectedSubcategory, setSubcategory] = React.useState("");
  const [selectedSubcategory2, setSubcategory2] = React.useState(""); */
  const { state } = useData();
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedProject, setSelectedProject] = React.useState("");
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubcategoryPrimary, setSelectedSubcategoryPrimary] =
    useState("");
  const [selectedSubcategorySecondary, setSelectedSubcategorySecondary] =
    useState("");
  const [filteredSubcategoriesPrimary, setFilteredSubcategoriesPrimary] =
    useState([]);
  const [filteredSubcategoriesSecondary, setFilteredSubcategoriesSecondary] =
    useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCategoryChange = (setter) => (value) => {
    setter(value);
  };

  const handleProjectChange = (setter) => (value) => {
    setter(value);
  };

  const getStepContent = (step) => {
    const projectOptions = state.projects.reduce((acc, project) => {
      acc[project.id] = project.name;
      return acc;
    }, {});

    useEffect(() => {
      if (selectedMainCategory) {
        const filtered = state.subcategoriesPrimary.filter(
          (subcategory) =>
            subcategory.mainCategory.toString() ===
            selectedMainCategory.toString()
        );
        setFilteredSubcategoriesPrimary(filtered);
      } else {
        setFilteredSubcategoriesPrimary([]);
      }
    }, [selectedMainCategory, state.subcategoriesPrimary]);

    useEffect(() => {
      if (selectedSubcategoryPrimary) {
        console.log(state.subcategoriesSecondary);
        const filteredSubs = state.subcategoriesSecondary.filter(
          (subcategory) =>
            subcategory.subcategoryPrimary &&
            subcategory.subcategoryPrimary.toString() ===
              selectedSubcategoryPrimary.toString()
        );
        console.log(filteredSubs);
        setFilteredSubcategoriesSecondary(filteredSubs);
      } else {
        setFilteredSubcategoriesSecondary([]);
      }
    }, [selectedSubcategoryPrimary, state.subcategoriesSecondary]);

    const handleMainCategoryChange = (value) => {
      setSelectedMainCategory(value);
    };

    const handleSubcategoryPrimaryChange = (value) => {
      setSelectedSubcategoryPrimary(value);
    };

    const handleSubcategorySecondaryChange = (value) => {
      setSelectedSubcategorySecondary(value);
    };

    switch (step) {
      case 0:
        return (
          <>
            <h1>Generell Information</h1>
            <Dropdown
              id="project"
              title="Projekt*"
              placeholder="Välj projekt"
              options={projectOptions}
              onOptionChange={handleProjectChange(setSelectedProject)}
            />

            <Box className={styles.dropdownContainer}>
              <Dropdown
                id="category"
                title="Produktnamn"
                placeholder="Produktnamn"
                options={state.mainCategories.reduce((acc, category) => {
                  acc[category.id] = category.name;
                  return acc;
                }, {})}
                onOptionChange={handleMainCategoryChange}
              />
              {
                /* selectedCategory */ selectedMainCategory && (
                  <Dropdown
                    id="subcategory1"
                    placeholder="Produktnamn"
                    onOptionChange={
                      /* handleCategoryChange(setSubCategory) */ handleSubcategoryPrimaryChange
                    }
                    options={filteredSubcategoriesPrimary.reduce(
                      (acc, subcategory) => {
                        acc[subcategory.id] = subcategory.name;
                        return acc;
                      },
                      {}
                    )}
                  />
                )
              }
              {
                /* selectedSubCategory */ selectedSubcategoryPrimary && (
                  <Dropdown
                    id="subcategory2"
                    placeholder="Produktnamn"
                    options={filteredSubcategoriesSecondary.reduce(
                      (acc, subcategory) => {
                        acc[subcategory.id] = subcategory.name;
                        return acc;
                      },
                      {}
                    )}
                    onOptionChange={
                      /* handleCategoryChange(setSubCategory2) */ setSelectedSubcategorySecondary
                    }
                  />
                )
              }
            </Box>
            <Textfield
              title="Eget Id-nummer"
              id="x"
              placeholder="EgetIdNummer"
            />
            <Textfield
              title="Produktbeskrivning"
              id="ProductDescription"
              placeholder="ProduktBeskrivning"
            />
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
            {/* for each prop in properties:  */}
            <RadioButton title="title" values={options} />
            <RadioButton title="title2" values={options2} />

            <h1>Form</h1>
            <Box className={styles.propertyInputContainer}>
              <Textfield title="Material" />
              <Textfield title="Färg/Finish" />
            </Box>
            <Box className={styles.propertyInputContainer}>
              <Textfield title="Bredd" />
              <Textfield title="Djup" />
              <Textfield title="Höjd" />
              <Dropdown
                title="Enhet mått"
                options={measurementUnits}
                size="small"
              />
            </Box>
            <Box className={styles.propertyInputContainer}>
              {/* knappar här */}
            </Box>
            <Box className={styles.propertyInputContainer}>
              <Textfield title="Vikt" /> <Textfield title="vikt" />
              <Dropdown title="Enhet vikt" options={weightUnits} size="small" />
            </Box>
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
    <Box sx={{ width: "100%" }}>
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
          <Typography sx={{ mt: 2, mb: 1 }}>
            Steg {activeStep + 1} av {steps.length}{" "}
          </Typography>
          {getStepContent(activeStep)}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Föregående
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Spara" : "Nästa"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default StepperComponent;
