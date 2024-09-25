import styles from "./Textfield.module.css";
import { Box, Typography } from "@mui/material";

export default function Textfield(props) {
  return (
    <Box className={styles.container}>
      <h2 className={styles.title}>{props.title}</h2>
      {props.type === "textarea" ? (
        <textarea
          className={styles.textarea}
          placeholder={props.placeholder}
          required={props.required || false}
          id={props.id}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          rows={props.rows || 4}
        />
      ) : (
        <input
          className={styles.input}
          type={props.type || "text"}
          placeholder={props.placeholder}
          required={props.required || false}
          id={props.id}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )}
    </Box>
  );
}