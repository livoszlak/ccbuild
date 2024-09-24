import { useData } from "../../../contexts/DataContext";
import { useState } from "react";
import Textfield from "../../atoms/Textfield/Textfield";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import RadioButton from "../../atoms/RadioButton/RadioButton";
import EstimateButton from "../../atoms/EstimateButton/EstimateButton";
/* import Box from "@mui/material/Box"; */
import {
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Step2.module.css";

const weightUnits = {
  option1: "g",
  option2: "kg",
  option3: "ton",
};

const measurementUnits = {
  option1: "mm",
  option2: "cm",
  option3: "m",
};

export default function Step2({ selectedSubcategorySecondary }) {
  const { state, dispatch, updateForm } = useData();

  const subcategorySecondary = state.subcategoriesSecondary.find(
    (subcategory) => subcategory.id.toString() === selectedSubcategorySecondary
  );

  const handlePropertyKeyChange = (key, value) => {
    dispatch({
      type: "UPDATE_PROPERTY_KEY",
      payload: { key, value },
    });
  };

  const handleFormChange = (key, value) => {
    updateForm(key, value);
  };

  return (
    <>
      <div>
        <h1>Egenskaper</h1>
        <div className={styles.propertiesInputWrapper}>
          {subcategorySecondary && subcategorySecondary.propertyKeys ? (
            Object.keys(subcategorySecondary.propertyKeys).map((key) => (
              <div key={key}>
                {subcategorySecondary.propertyKeys[key] ? (
                  <RadioButton
                    title={key}
                    name={`property-${key}`}
                    values={subcategorySecondary.propertyKeys[key]}
                    selectedValue={
                      state.selectedPropertyKeys[key] ||
                      subcategorySecondary.propertyKeys[key][0]
                    }
                    onChange={(value) => handlePropertyKeyChange(key, value)}
                  />
                ) : (
                  <Textfield
                    title={key}
                    value={state.selectedPropertyKeys[key] || ""}
                    onChange={(value) => handlePropertyKeyChange(key, value)}
                  />
                )}
              </div>
            ))
          ) : (
            <div>
              <p>Det finns inga specifika egenskaper för vald produkttyp.</p>
            </div>
          )}
        </div>
      </div>

      <h1>Form</h1>
      <Box className={styles.formInputWrapper}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Textfield
            title="Material"
            size="small"
            value={state.form.material || ""}
            onChange={(value) => handleFormChange("material", value)}
          />
          <Textfield
            title="Färg / Finish"
            size="small"
            value={state.form.finish || ""}
            onChange={(value) => handleFormChange("finish", value)}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Dropdown
            title="Enhet mått"
            placeholder="mm"
            options={measurementUnits}
            size="small"
            value={state.form.measurementUnit || ""}
            onOptionChange={(value) =>
              handleFormChange("measurementUnit", value)
            }
          />
          <Textfield
            title="Bredd"
            value={state.form.width || ""}
            onChange={(value) => handleFormChange("width", value)}
          />
          <Textfield
            title="Djup"
            value={state.form.depth || ""}
            onChange={(value) => handleFormChange("depth", value)}
          />
          <Textfield
            title="Höjd"
            value={state.form.height || ""}
            onChange={(value) => handleFormChange("height", value)}
          />
        </Box>

        <Textfield
          id="diameter"
          title="Diameter"
          value={state.form.diameter || ""}
          onChange={(value) => handleFormChange("diameter", value)}
        />
        <Textfield
          id="length"
          title="Längd"
          value={state.form.length || ""}
          onChange={(value) => handleFormChange("length", value)}
        />
        <Textfield
          id="thickness"
          title="Tjocklek"
          value={state.form.thickness || ""}
          onChange={(value) => handleFormChange("thickness", value)}
        />

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Textfield
            title="Vikt / st *"
            fullWidth
            size="small"
            value={state.form.weightPer || ""}
            onChange={(value) => handleFormChange("weightPer", value)}
          />
          <Dropdown
            title="Enhet vikt"
            placeholder="kg"
            options={weightUnits}
            value={state.form.weightUnit || ""}
            onOptionChange={(value) => handleFormChange("weightUnit", value)}
          />
          <EstimateButton text="Uppskatta vikt" />
        </Box>
      </Box>
    </>
  );
}
