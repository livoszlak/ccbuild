import { Box, Checkbox } from "@mui/material";
import styles from "./Step3.module.css";
import * as React from "react";
import { useState } from "react";
import Individual from "../Individual/Individual";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { useData } from "../../../contexts/DataContext";

export default function Step3() {
  const { state } = useData();

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

  const [rows, setRows] = useState([
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
  };

  return (
    <>
      <Box className={styles.headerContainer}>
        <h1>Plats/Status/Antal</h1>
        <Box className={styles.buttonContainer}>
          <CustomButton variant="outlined" sx={{ borderRadius: "100px" }}>
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
=======
    const [rows, setRows] = useState([
        { id: 1, Amount: '1', Status: 'Inventerad', Marketplace: 'Ej Publicerad' },
      ]);
    
      const handleAmmountChange = (id, value) => {
        setRows(rows.map(row => row.id === id ? { ...row, Ammount: value } : row));
      };
      const handleStatusChange = (id, value) => {
        console.log('hello')
      }
       const handleMarketplaceChange = (id, value) => {
           console.log('hello')
        }
    return(
        <>
        <Box className={styles.headerContainer}>
            <h1>Plats/Status/Antal</h1>
            <Box className={styles.buttonContainer}>
                <CustomButton variant='outlined'>
                  LÄGG TILL NY<AddIcon fontSize="small" />
                </CustomButton>
                <CustomButton text="radera" variant='contained' disabled='true'/>
                <CustomButton text="kommentarer" variant='contained' disabled='true'/>
                <CustomButton text="öppna planritning" variant='contained' disabled='true'/>
            </Box>

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
          {rows.map((row) => (
            <Individual
              key={row.id}
              row={row}
              rowId={row.id}
              statusOptions={statusOptions}
              marketplaceOptions={marketplaceOptions}
              handleAmountChange={handleAmountChange}
              handleStatusChange={handleStatusChange}
              handleMarketplaceChange={handleMarketplaceChange}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
