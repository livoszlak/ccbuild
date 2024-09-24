import Textfield from "../../atoms/Textfield/Textfield";
import { useData } from "../../../contexts/DataContext";
import { Box } from "@mui/material";
import styles from "./Step4.module.css";

export default function Step4() {
  const { state, dispatch, updateProductInfo } = useData();

  const handleProductInfoChange = (key, value) => {
    updateProductInfo(key, value);
  };

  return (
    <Box className={styles.step4Container}>
      <h1>Produktinformation</h1>

      <Box className={styles.textfieldContainer}>
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

      <Box className={styles.textfieldContainerRow}>
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
    </Box>
  );
}
