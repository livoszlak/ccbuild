import Textfield from "../../atoms/Textfield/Textfield";
import { useData } from "../../../contexts/DataContext";
import { Box } from "@mui/material";
import styles from "./Step4.module.css";
import ExpandableButton from "../../atoms/ExpandableButton/ExpandableButton";

export default function Step4() {
  const { state, dispatch, updateProductInfo } = useData();

  const handleProductInfoChange = (key, value) => {
    updateProductInfo(key, value);
  };

  return (
    <Box className={styles.stepContainer}>
      <h1>Produktinformation</h1>

      <Box>
        <Textfield
          title="Tillverkare/leverantör"
          placeholder="Ange tillverkare eller leverantör"
          value={state.productInformation.manufacturer || ""}
          onChange={(value) => handleProductInfoChange("manufacturer", value)}
        />

        <Textfield
          title="Artikelnummer"
          placeholder="Ange tillverkarens/leverantörens artikelnummer"
          value={state.productInformation.itemNumber || ""}
          onChange={(value) => handleProductInfoChange("itemNumber", value)}
        />
      </Box>

      <Box className={styles.containerRow}>
        <Textfield
          title="Tillverkningsår"
          placeholder="Uppskattat tillverkningsår"
          value={state.productInformation.manufacturedYear || ""}
          onChange={(value) =>
            handleProductInfoChange("manufacturedYear", value)
          }
        />
        <Textfield
          title="Inköpsår"
          placeholder="Uppskattat inköpsår"
          value={state.productInformation.purchasedYear || ""}
          onChange={(value) => handleProductInfoChange("purchasedYear", value)}
        />
      </Box>

      <Box className={styles.buttonContainer}>
        <ExpandableButton text="GTIN" />
        <ExpandableButton text="RSK" />
        <ExpandableButton text="E-NR" />
        <ExpandableButton text="BSAB" />
        <ExpandableButton text="BK04" />
      </Box>
    </Box>
  );
}
