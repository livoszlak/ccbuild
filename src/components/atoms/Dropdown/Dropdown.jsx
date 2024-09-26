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

  const getClassName = (size) => {

    switch (size) {
      case "inline":
        return styles.inline;
        case "large":
        return styles.containerLarge;
      case "small":
        return styles.containerSmall;
      default:
        return styles.container;
    }
  }
  return (
    <Box
      className={getClassName(size)}
    >
      <h2 className={styles.title}>{title}</h2>
      <Select
        sx={{ maxHeight: "35px", py: '0px !important!', fontSize: '14px !important', fontStyle: 'normal'}}
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
