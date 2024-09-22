import { useData } from "../../../contexts/DataContext";
import Textfield from "../../atoms/Textfield/Textfield";
import RadioButton from "../../atoms/RadioButton/RadioButton";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import Box from "@mui/material/Box";
import styles from "./Step3.module.css";

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

export default function Step3({ selectedSubcategorySecondary }) {
  const { state } = useData();

  const subcategorySecondary = state.subcategoriesSecondary.find(
    (subcategory) => subcategory.id.toString() === selectedSubcategorySecondary
  );

  return (
    <>
      <div>
        <h1>Egenskaper</h1>
        {subcategorySecondary && subcategorySecondary.propertyKeys ? (
          Object.keys(subcategorySecondary.propertyKeys).map((key) => (
            <div key={key}>
              {subcategorySecondary.propertyKeys[key] ? (
                <RadioButton
                  title={key}
                  values={subcategorySecondary.propertyKeys[key]}
                />
              ) : (
                <Textfield title={key} />
              )}
            </div>
          ))
        ) : (
          <div>
            <p>Det finns inga specifika egenskaper för vald produkttyp.</p>
          </div>
        )}
      </div>

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
            value={state.measurementUnit || ""}
          />
        </Box>
        <Box className={styles.propertyInputContainer}>{/* knappar här */}</Box>
        <Box className={styles.propertyInputContainer}>
          <Textfield title="Vikt" value={state.weight || ""} />
          <Dropdown
            title="Enhet vikt"
            options={weightUnits}
            size="small"
            value={state.weightUnit || ""}
          />
        </Box>
      </div>
    </>
  );
}
