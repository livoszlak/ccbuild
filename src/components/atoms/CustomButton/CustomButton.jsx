import { Button } from "@mui/material";
import styles from "./CustomButton.module.css";
import { StarPurple500Sharp } from "@mui/icons-material";

export default function CustomButton(props) {
  return (
    <Button
      variant={props.variant}
      className={styles.button}
      disabled={props.disabled || false}
      sx={props.sx}
      onClick={props.onClick}
    >
      {props.text}
      {props.children}
    </Button>
  );
}
