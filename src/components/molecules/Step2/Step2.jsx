import { useData } from "../../../contexts/DataContext";
import Textfield from "../../atoms/Textfield/Textfield";
import RadioButton from "../../atoms/RadioButton/RadioButton";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import Box from "@mui/material/Box";
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

  const subcategorySecondary = state.subcategoriesSecondary.find(
    (subcategory) => subcategory.id.toString() === selectedSubcategorySecondary
  );

  const handlePropertyKeyChange = (key, value) => {
    dispatch({
      type: "UPDATE_PROPERTY_KEY",
      payload: { key, value },
    });
    console.log(state.selectedPropertyKeys);
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
      {/* 
      <div>
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
            value={state.measurementUnit || "mm"}
          />
        </Box>
        <Box className={styles.propertyInputContainer}></Box>
        <Box className={styles.propertyInputContainer}>
          <Textfield title="Vikt" value={state.weight || ""} />
          <Dropdown
            title="Enhet vikt"
            options={weightUnits}
            size="small"
            value={state.weightUnit || "kg"}
          />
        </Box>
      </div> */}
    </>
  );
}
