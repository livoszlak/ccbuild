import { useData } from "../../../contexts/DataContext";
import { useState } from "react";
import Textfield from "../../atoms/Textfield/Textfield";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import RadioButton from "../../atoms/RadioButton/RadioButton";
import EstimateButton from "../../atoms/EstimateButton/EstimateButton";
import ExpandableButton from "../../atoms/ExpandableButton/ExpandableButton";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  IconButton,
  Paper,
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
  const [open, setOpen] = useState(false);

  function openTextBox() {
    setOpen((prevOpen) => !prevOpen);
  }

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
      <div className={styles.wrapper}>
        <h1 className={styles.headerText}>Egenskaper</h1>
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
      <Box className={styles.formHeader}>
        <h1>Form</h1>
      </Box>
      <Box className={styles.formInputWrapper}>
        <Box className={styles.horizontalWrapper}>
          <Textfield
            title="Vikt / st *"
            placeholder="Vikt"
            size="small"
            value={state.form.weightPer || ""}
            onChange={(value) => handleFormChange("weightPer", value)}
          />
          <Dropdown
            title="Enhet vikt"
            placeholder="kg"
            size="small"
            options={weightUnits}
            value={state.form.weightUnit || ""}
            onOptionChange={(value) => handleFormChange("weightUnit", value)}
          />
          <Box>
          <EstimateButton text="Uppskatta vikt" />
          </Box>
          <IconButton sx={{marginLeft: '-10px', p: 0, mb: '5px'}}  onClick={openTextBox}>
            <HelpOutlineIcon color="primary"/>
          </IconButton>
          { open  && 
            <Paper sx={{width: '150px', height:'fit-content', backgroundColor: '#F9F9F9', paddingX: '8px', border: '1px solid #E2E2E2', boxShadow: 'none'}} >
            <p>Information angående vikt</p>
            </Paper>
          }
        </Box>
        <Box sx={{ display: "flex", gap: '16px'}}>
          <Textfield
            title="Material"
            placeholder="Material"
            size="small"
            value={state.form.material || ""}
            onChange={(value) => handleFormChange("material", value)}
          />
          <Textfield
            title="Färg / Finish"
            placeholder="Färg / Finish"
            size="small"
            value={state.form.finish || ""}
            onChange={(value) => handleFormChange("finish", value)}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: 'self-end'}}>
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
            placeholder="Bredd"
            value={state.form.width || ""}
            size="xs"
            onChange={(value) => handleFormChange("width", value)}
          />
          <Textfield
            title="Djup"
            placeholder="Djup"
            size="xs"
            value={state.form.depth || ""}
            onChange={(value) => handleFormChange("depth", value)}
          />
          <Textfield
            title="Höjd"
            placeholder="Höjd"
            size="xs"
            value={state.form.height || ""}
            onChange={(value) => handleFormChange("height", value)}
          />
        </Box>

        <Box className={styles.buttonContainer}>
          <ExpandableButton text="Diameter" size="large" />
          <ExpandableButton text="Längd" size="large" />
          <ExpandableButton text="Tjocklek" size="large" />
        </Box>
      </Box>
    </>
  );
}
