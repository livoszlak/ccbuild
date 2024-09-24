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

export default function Step3({ selectedSubcategorySecondary }) {
  const { state, dispatch } = useData();

  const [expandedFields, setExpandedFields] = useState({
    diameter: false,
    langd: false,
    tjocklek: false,
  });

  const toggleField = (field) => {
    setExpandedFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const ExpandableField = ({ label, expanded, onToggle }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <Typography sx={{ flexGrow: 1 }}>{label}</Typography>
      <IconButton onClick={onToggle} size="small">
        <AddIcon />
      </IconButton>
      {expanded && (
        <Textfield
          sx={{ ml: 2, flexGrow: 1 }}
          size="small"
          placeholder={label}
        />
      )}
    </Box>
  );

  const subcategorySecondary = state.subcategoriesSecondary.find(
    (subcategory) => subcategory.id.toString() === selectedSubcategorySecondary
  );

  const handlePropertyKeyChange = (key, value) => {
    dispatch({
      type: "UPDATE_PROPERTY_KEY",
      payload: { key, value },
    });
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
          <Textfield title="Material" />
          <Textfield title="Färg / Finish" />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Dropdown
            title="Enhet mått"
            defaultValue="mm"
            options={measurementUnits}
            size="small"
          />
          <Textfield title="Bredd" />
          <Textfield title="Djup" />
          <Textfield title="Höjd" />
        </Box>

        <ExpandableField
          label="Diameter"
          expanded={expandedFields.diameter}
          onToggle={() => toggleField("diameter")}
        />
        <ExpandableField
          label="Längd"
          expanded={expandedFields.langd}
          onToggle={() => toggleField("langd")}
        />
        <ExpandableField
          label="Tjocklek"
          expanded={expandedFields.tjocklek}
          onToggle={() => toggleField("tjocklek")}
        />

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Textfield title="Vikt / st *" fullWidth size="small" />
          <Dropdown
            title="Enhet vikt"
            defaultValue="kg"
            options={weightUnits}
          />
          <EstimateButton text="Uppskatta vikt" />
        </Box>
      </Box>
    </>
  );
}
