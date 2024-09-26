import { Box, Checkbox } from "@mui/material";
import styles from "./Step3.module.css";
import * as React from "react";
import { useState } from "react";
import Individual from "../Individual/Individual";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { useData } from "../../../contexts/DataContext";

export default function Step3() {
  const { state, handleAddProductIndividual } = useData();

  const marketplaceOptions = ["Ej Publicerad", "Publicerad"];
  const statusOptions = [
    "Inventerad",
    "Inventerad - i byggnad",
    "Inventerad - i lager/förråd",
    "Mängdad",
    "Mängdad - i byggnad",
    "Mängdad - i lager/förråd",
    "På rekonditionering",
    "I lager",
    "Bevarad (slutstatus)",
    "Återbrukad i projektering",
    "Återbrukad i organisationen",
    "Återbrukad externt av annan aktör",
    "Avfallshanterad (slutstatus)",
  ];

  /*   const [rows, setRows] = useState([
    { id: 1, amount: "1", status: "Inventerad", marketplace: "Ej Publicerad" },
  ]);

  const handleAmountChange = (id, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, amount: value } : row))
    );
  };

  const handleStatusChange = (id, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, status: value } : row))
    );
  };

  const handleMarketplaceChange = (id, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, marketplace: value } : row))
    );
  }; */

  return (
    <>
      <Box className={styles.headerContainer}>
        <h1>Plats/Status/Antal</h1>
        <Box className={styles.buttonContainer}>
          <CustomButton
            variant="outlined"
            sx={{ borderRadius: "100px" }}
            onClick={handleAddProductIndividual}
          >
            Lägg till ny <AddIcon fontSize="small" />
          </CustomButton>
          <CustomButton
            text="Radera"
            variant="contained"
            disabled={true}
            sx={{
              textTransform: "none",
              borderRadius: "100px",
            }}
          />
          <CustomButton
            text="Kommentarer"
            variant="contained"
            disabled={true}
            sx={{
              textTransform: "none",
              borderRadius: "100px",
            }}
          />
          <CustomButton
            text="Öppna planritning"
            variant="contained"
            disabled={true}
            sx={{
              textTransform: "none",
              borderRadius: "100px",
            }}
          />
        </Box>
      </Box>
      <table>
        <thead>
          <tr>
            <th>
              <Checkbox />
            </th>
            <th>Antal (st)</th>
            <th>Status</th>
            <th>Marknadsplatsen</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.individualContainer}>
          {state.productIndividual.map((product) => (
            <Individual
              key={product.id}
              row={product}
              statusOptions={statusOptions}
              marketplaceOptions={marketplaceOptions}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
