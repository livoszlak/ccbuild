import { Box, Checkbox, Button, Paper, Typography } from "@mui/material"
import EstimateButton from "../../atoms/EstimateButton/EstimateButton";
import styles from "./Step3.module.css";
import * as React from 'react';
import Dropdown from "../../atoms/Dropdown/Dropdown";
import { useState } from 'react';
import Individual from "../Individual/Individual";

export default function Step3 () {

    const marketplaceOptions = [
        'Ej Publicerad',
        'Publicerad'
    ];
    const statusOptions = [
        'Inventerad', 
        'Inventerad - i byggnad',
        'Inventerad - i lager/förråd',
        'Mängdad',
        'Mängdad - i byggnad',
        'Mängdad - i lager/förråd',
        'På rekonditionering',
        'I lager',
        'Bevarad (slutstatus)',
        'Återbrukad i projektering',
        'Återbrukad i organisationen',
        'Återbrukad externt av annan aktör',
        'Avfallshanterad (slutstatus)'
    ];


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
                <EstimateButton text="ny produkt +"/>
                <EstimateButton text="radera"/>
                <EstimateButton text="kommentarer"/>
                <EstimateButton text="öppna planritning"/>
            </Box>
        </Box>
        <table>
      <thead>
        <tr>
            <Checkbox/>
          <th>Amount</th>
          <th>Status</th>
          <th>Marketplace</th>
          <th></th>
        </tr>
      </thead>
      <tbody className={styles.individualContainer}>
        <Individual 
            key={rows.id}
            row={rows}
            statusOptions={statusOptions}
            marketplaceOptions={marketplaceOptions}
            handleAmmountChange={handleAmmountChange}
            handleStatusChange={handleStatusChange}
            handleMarketplaceChange={handleMarketplaceChange}>
        </Individual>
      </tbody>
    </table>
    </>
    );
}