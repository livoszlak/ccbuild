import styles from "./EstimateButton.module.css";
import { Button } from "@mui/material";

export default function EstimateButton(props) {
  return (
    <Button
      variant="contained"
      color="secondary"
      className={styles.estimateButton}
      disableElevation={true}
      sx={{
        fontFamily: "Inter",
        padding: "7px",
        borderRadius: "3px",
        height: "35px",
        textTransform: "none",
        fontWeight: "var(--regular)",
      }}
    >
      {props.text}
    </Button>
  );
}
