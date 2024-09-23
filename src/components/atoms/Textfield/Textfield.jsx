import styles from "./Textfield.module.css";
import { Box, Typography } from "@mui/material";

export default function Textfield(props) {
  return (
    <Box className={styles.container}>
      <h2 className={styles.title}>{props.title}</h2>
      <input
        className={styles.input}
        type="text"
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </Box>
  );
}
