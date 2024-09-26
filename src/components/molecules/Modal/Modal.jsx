import { Modal, Typography, Paper, Box } from "@mui/material";
import styles from "./Modal.module.css";
import { useState } from "react";
import Rating from "../../atoms/Rating/Rating";
import DatePicker from "../../atoms/DatePicker/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import { useData } from "../../../contexts/DataContext";
import Textfield from "../../atoms/Textfield/Textfield";

export default function ModalComponent(props) {
  const [AestheticScore, setAestheticScore] = useState(0);
  const [FunctionalityScore, setFunctionalityScore] = useState(0);
  const [AestheticHover, setAestheticHover] = useState(-1);
  const [FunctionalityHover, setFunctionalityHover] = useState(-1);

  const { state } = useData();

  const labels = {
    0: "Ej Bedömd",
    1: "Skada går ej att åtgärda",
    2: "Skada är svår att åtgärda",
    3: "Skada går att åtgärda av proffs",
    4: "Skada går att åtgärda av lekman",
    5: "Inga Skador",
  };

  const deconstructionOptions = [
    "Enkel att demontera/demontering krävs ej",
    "Demonterbar men specialverktyg kan krävas",
    "Begränsad demonterbarhet",
  ];

  const accessibilityOptions = [
    "Lätt åtkomlig",
    "Åtkomlig men planering och specialverktyg kan krävas",
    "Begränsad åtkomlighet",
  ];

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  return (
    <>
      {props.open && <div className={styles.overlay}></div>}
      <Modal
        className={styles.modalContainer}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper className={styles.modal}>
          <Box className={styles.closeIconContainer}>
            <CloseIcon onClick={props.handleClose} />
          </Box>
          <h1 id="modal-modal-title">Status och platsinformation</h1>
          <Box className={styles.ratingContainer}>
            <Rating
              title="Estetiskt skick"
              id="functionality"
              value={AestheticScore}
              hover={AestheticHover}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setAestheticScore(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setAestheticHover(newHover);
              }}
              labels={labels}
            />
            <Rating
              title="Estetiskt skick"
              id="functionality"
              value={FunctionalityScore}
              hover={FunctionalityHover}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setFunctionalityScore(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setFunctionalityHover(newHover);
              }}
              labels={labels}
            />
          </Box>
          <DatePicker
            title1="Datum tillgänglig/-a"
            title2="Datum första möjliga leverans"
          />

          <Box className={styles.textfieldContainer}>
            <Dropdown
              title="Demonterbarhet"
              options={deconstructionOptions}
              onOptionChange=""
              id="deconstruction"
              value=""
            />
            <Dropdown
              title="Åtkomlighet"
              options={accessibilityOptions}
              onOptionChange=""
              id="accessibility"
              value=""
            />
          </Box>

          <Box className={styles.buttonContainer}>
            <CustomButton
              text="Stäng"
              variant="contained"
              disabled={false}
              sx={{
                textTransform: "none",
                borderRadius: "100px",
                backgroundColor: "#FFF",
                border: "1px solid #488AC6",
                color: "#488AC6",
              }}
              onClick={props.handleClose}
            />
            <CustomButton
              text="Spara"
              variant="contained"
              disabled={false}
              sx={{
                textTransform: "none",
                borderRadius: "100px",
                border: "1px solid #488AC6;",
              }}
              onClick={console.log(state)}
            />
          </Box>
        </Paper>
      </Modal>
    </>
  );
}
