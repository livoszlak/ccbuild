import styles from "./Textfield.module.css";
import { Box, Typography } from "@mui/material";

export default function Textfield(props) {

  const getClassName = (size) => {

    switch (size) {
      case "large":
        return styles.containerLarge;
      case "small":
        return styles.containerSmall;
        case "xs":
        return styles.containerXs;
      default:
        return styles.container;
    }
  }

  return (
    <Box
      className={
        getClassName(props.size)
      }
    >
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
          className={props.size === 'medium'  ? styles.mediumInput : styles.input}
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