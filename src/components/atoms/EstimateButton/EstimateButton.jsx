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
        fontSize: "14px",
        padding: "7px",
        borderRadius: "2px",
        display: "flex",
        height: "32px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "none",
        fontWeight: "400",
        lineHeight: "21px",
      }}
    >
      {props.text}
    </Button>
  );
}
