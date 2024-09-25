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
  const handleProductNameChange = (value) => {
    setProductName(value, true);
  };

  const handleInternalIdChange = (value) => {
    setInternalId(value);
    dispatch({ type: "SET_INTERNAL_ID", payload: value });
  };

  const handleProductDescriptionChange = (value) => {
    setProductDescription(value);
    dispatch({ type: "SET_PRODUCT_DESCRIPTION", payload: value });
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

    const selectedSubcategory = state.subcategoriesSecondary.find(
      (category) => category.id.toString() === id
    );

    if (selectedSubcategory) {
      const propertyKeys = selectedSubcategory.propertyKeys;
      const initialPropertyKeys = Object.keys(propertyKeys).reduce(
        (acc, key) => {
          acc[key] = null;
          return acc;
        },
        {}
      );

      dispatch({ type: "SET_SELECTED_SUBCATEGORY_SECONDARY", payload: id });
      dispatch({ type: "SET_PROPERTY_KEYS", payload: initialPropertyKeys });
      console.log(state.selectedPropertyKeys);
    }
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
      <h1>Generell information</h1>
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
      <Box className={styles.textfieldContainer}>
        <Textfield
          title="Produktnamn*"
          id="productName"
          value={state.productName || ""}
          onChange={handleProductNameChange}
        />
        <Typography sx={{ fontSize: "11px", width: "fit-content" }}>
          Du kan ändra namnet i den här rutan om du inte är nöjd med det som
          genererades automatiskt.
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
    </Box>
  );
}
