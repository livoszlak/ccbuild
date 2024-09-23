import React from "react";
import { useState, useEffect } from "react";
import { useData } from "../../../contexts/DataContext";
import Textfield from "../../atoms/Textfield/Textfield";
import { Typography } from "@mui/material";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import { Box } from "@mui/material";
import styles from "./Step1.module.css";

export default function Step1() {
  const {
    state,
    dispatch,
    setProject,
    setMainCategory,
    setSubcategoryPrimary,
    setSubcategorySecondary,
    setProductName,
    setInternalId,
    setProductDescription,
  } = useData();

  // Handlers for changing productName, internalId and productDescription and setting them in context state
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
    dispatch({ type: "SET_PRODUCT_NAME", payload: e.target.value });
  };

  const handleInternalIdChange = (e) => {
    setInternalId(e.target.value);
    dispatch({ type: "SET_INTERNAL_ID", payload: e.target.value });
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
    dispatch({ type: "SET_PRODUCT_DESCRIPTION", payload: e.target.value });
  };

  // Create an object mapping project IDs to project names
  const projectOptions = state.projects.reduce((acc, project) => {
    acc[project.id] = project.name;
    return acc;
  }, {});

  // Find the name of selected main category
  const mainCategoryName = state.mainCategories.find(
    (category) => category.id.toString() === state.selectedMainCategory
  )?.name;

  // Find the name of selected primary subcategory
  const subcategoryPrimaryName = state.subcategoriesPrimary.find(
    (category) => category.id.toString() === state.selectedSubcategoryPrimary
  )?.name;

  // Handler for project change (TODO: as mentioned above, should be refactored to match the other setters which use dispatch to context state)
  /* const handleProjectChange = (setter) => (value) => {
    setter(value);
  }; */

  const handleProjectChange = (id) => {
    setProject(id);
  };

  // Handlers for category changes (needed to display correct subcategories on id)
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

  /* const [selectedProject, setSelectedProject] = React.useState(""); */
  const [filteredSubcategoriesPrimary, setFilteredSubcategoriesPrimary] =
    useState([]);
  const [filteredSubcategoriesSecondary, setFilteredSubcategoriesSecondary] =
    useState([]);

  // Filter primary subcategories based on selected main category
  useEffect(() => {
    setFilteredSubcategoriesPrimary(
      state.subcategoriesPrimary.filter(
        (subcategory) =>
          subcategory.mainCategory.toString() ===
          state.selectedMainCategory?.toString()
      )
    );
  }, [state.selectedMainCategory, state.subcategoriesPrimary]);

  // Filter secondary subcategories based on selected primary subcategory
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

  return (
    <Box className={styles.step1Container}>
      <h1>Generell Information</h1>
      <Dropdown
        id="project"
        title="Projekt*"
        placeholder="Ej angivet"
        options={projectOptions}
        onOptionChange={handleProjectChange}
        value={state.project || ""}
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
            options={filteredSubcategoriesPrimary.reduce((acc, subcategory) => {
              acc[subcategory.id] = subcategory.name;
              return acc;
            }, {})}
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
      <Typography sx={{ fontSize: "11px", width: "fit-content" }}>
        Om du inte anger något här skapas ett produktnamn när du sparar. Du kan
        ändra namnet senare.
      </Typography>
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
}
