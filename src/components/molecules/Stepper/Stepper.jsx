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
import Step3 from "../Step3/Step3";
import { useData } from "../../../contexts/DataContext";
import { useState, useEffect } from "react";

// define the number of steps //
const steps = [0, 1, 2, 3, 4];

/* const weightUnits = {
  option1: "Value 1",
  option2: "Value 2",
  option3: "Value 3",
};
const measurementUnits = {
  option1: "Value 1",
  option2: "Value 2",
  option3: "Value 3",
}; */

function StepperComponent() {
  const {
    state,
    setMainCategory,
    setSubcategoryPrimary,
    setSubcategorySecondary,
    setProductName,
    setInternalId,
    setProductDescription,
  } = useData();

  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedProject, setSelectedProject] = React.useState("");
  const [filteredSubcategoriesPrimary, setFilteredSubcategoriesPrimary] =
    useState([]);
  const [filteredSubcategoriesSecondary, setFilteredSubcategoriesSecondary] =
    useState([]);

  // initialize state from context
  useEffect(() => {
    setFilteredSubcategoriesPrimary(
      state.subcategoriesPrimary.filter(
        (subcategory) =>
          subcategory.mainCategory.toString() ===
          state.selectedMainCategory?.toString()
      )
    );
  }, [state.selectedMainCategory, state.subcategoriesPrimary]);

  useEffect(() => {
    setFilteredSubcategoriesSecondary(
      state.subcategoriesSecondary.filter(
        (subcategory) =>
          subcategory.subcategoryPrimary &&
          subcategory.subcategoryPrimary.toString() ===
            state.selectedSubcategoryPrimary?.toString()
      )
    );
  }, [state.selectedSubcategoryPrimary, state.subcategoriesSecondary]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleProjectChange = (setter) => (value) => {
    setter(value);
  };

  const handleMainCategoryChange = (id) => {
    setMainCategory(id);
    setSubcategoryPrimary("");
    setSubcategorySecondary("");
  };

  const handleSubcategoryPrimaryChange = (id) => {
    setSubcategoryPrimary(id);
    setSubcategorySecondary("");
  };

  const handleSubcategorySecondaryChange = (id) => {
    setSubcategorySecondary(id);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleInternalIdChange = (e) => {
    setInternalId(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const getStepContent = (step) => {
    const projectOptions = state.projects.reduce((acc, project) => {
      acc[project.id] = project.name;
      return acc;
    }, {});

    const mainCategoryName = state.mainCategories.find(
      (category) => category.id.toString() === state.selectedMainCategory
    )?.name;

    const subcategoryPrimaryName = state.subcategoriesPrimary.find(
      (category) => category.id.toString() === state.selectedSubcategoryPrimary
    )?.name;

    switch (step) {
      case 0:
        return (
          <Box className={styles.step1Container}>
            <h1>Generell Information</h1>
            <Dropdown
              id="project"
              title="Projekt*"
              placeholder="Välj projekt"
              options={projectOptions}
              onOptionChange={handleProjectChange(setSelectedProject)}
              value={selectedProject}
            />

            <Box className={styles.dropdownContainer}>
              <Dropdown
                id="category"
                title="Produktkategori*"
                placeholder="Välj huvudkategori..."
                options={state.mainCategories.reduce((acc, category) => {
                  acc[category.id] = category.name;
                  return acc;
                }, {})}
                onOptionChange={handleMainCategoryChange}
                value={state.selectedMainCategory}
              />
              {state.selectedMainCategory && (
                <Dropdown
                  id="subcategory1"
                  title={`Underkategori till ${mainCategoryName}*`}
                  placeholder="Välj underkategori..."
                  onOptionChange={handleSubcategoryPrimaryChange}
                  options={filteredSubcategoriesPrimary.reduce(
                    (acc, subcategory) => {
                      acc[subcategory.id] = subcategory.name;
                      return acc;
                    },
                    {}
                  )}
                  value={state.selectedSubcategoryPrimary}
                />
              )}
              {state.selectedSubcategoryPrimary && (
                <Dropdown
                  id="subcategory2"
                  title={`Underkategori till ${subcategoryPrimaryName}*`}
                  placeholder="Välj underkategori..."
                  options={filteredSubcategoriesSecondary.reduce(
                    (acc, subcategory) => {
                      acc[subcategory.id] = subcategory.name;
                      return acc;
                    },
                    {}
                  )}
                  onOptionChange={handleSubcategorySecondaryChange}
                  value={state.selectedSubcategorySecondary || ""}
                />
              )}
            </Box>
            <Textfield
              title="Produktnamn*"
              id="productName"
              value={state.productName || ""}
              onChange={handleProductNameChange}
            />
            <Textfield
              title="Eget ID-nummer"
              id="internalId"
              placeholder="Eget ID-nummer"
              value={state.internalId || ""}
              onChange={handleInternalIdChange}
            />
            <Textfield
              title="Produktbeskrivning"
              id="productDescription"
              placeholder="Produktbeskrivning"
              value={state.productDescription || ""}
              onChange={handleProductDescriptionChange}
            />
          </Box>
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
            <Step3
              selectedSubcategorySecondary={state.selectedSubcategorySecondary}
            />
          </>
          /* 
            <h1>Form</h1>
            <Box className={styles.propertyInputContainer}>
              <Textfield title="Material" value={state.material || ""} />
              <Textfield title="Färg/Finish" value={state.colorFinish || ""} />
            </Box>
            <Box className={styles.propertyInputContainer}>
              <Textfield title="Bredd" value={state.width || ""} />
              <Textfield title="Djup" value={state.depth || ""} />
              <Textfield title="Höjd" value={state.height || ""} />
              <Dropdown
                title="Enhet mått"
                options={measurementUnits}
                size="small"
                value={state.measurementUnit || ""}
              />
            </Box>
            <Box className={styles.propertyInputContainer}>
              
            </Box>
            <Box className={styles.propertyInputContainer}>
              <Textfield title="Vikt" value={state.weight || ""} />
              <Dropdown
                title="Enhet vikt"
                options={weightUnits}
                size="small"
                value={state.weightUnit || ""}
              />
            </Box>
          </> */
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
