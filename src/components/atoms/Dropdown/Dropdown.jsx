import { MenuItem, Select, Box } from "@mui/material";
import styles from "./Dropdown.module.css";
import { useState } from "react";

export default function Dropdown(props) {
  const [selectedOption, setOption] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setOption(value);
    if (props.onOptionChange) {
      props.onOptionChange(value);
    }
  }

  return (
    <Box className={styles.container}>
      <h2 className={styles.title}>{props.title}</h2>
      <Select
        sx={{ maxHeight: "33px" }}
        className={props.size === "small" ? styles.inputSmall : styles.input}
        placeholder={props.placeholder}
        value={selectedOption}
        id={props.id}
        onChange={handleChange}
        renderValue={(selected) => {
          if (selected === "") {
            return <em>Välj...</em>;
          }
          return props.options[selected];
        }}
      >
        {Object.keys(props.options).map((option) => (
          <MenuItem key={option} value={option}>
            {props.options[option]}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
