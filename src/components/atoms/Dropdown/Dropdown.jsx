import React from "react";
import { MenuItem, Select, Box } from "@mui/material";
import styles from "./Dropdown.module.css";

export default function Dropdown({
  title,
  options,
  onOptionChange,
  value,
  id,
  size,
  placeholder = "Välj...",
}) {
  function handleChange(event) {
    const newValue = event.target.value;
    if (onOptionChange) {
      onOptionChange(newValue);
    }
  }

  return (
    <Box className={size === "small" ?  styles.containerSmall : styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <Select
        sx={{ maxHeight: "33px" }}
        className={size === "small" ? styles.inputSmall : styles.input}
        value={value || ""}
        id={id}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => {
          if (!selected || selected === "") {
            return <em>{placeholder}</em>;
          }
          return options[selected] || placeholder;
        }}
      >
        <MenuItem value="">
          <em>{placeholder}</em>
        </MenuItem>
        {Object.entries(options).map(([key, optionValue]) => (
          <MenuItem key={key} value={key}>
            {optionValue}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
