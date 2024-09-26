import { Modal, Link, Paper, Box } from "@mui/material";
import styles from "./Modal.module.css";
import { useState } from "react";
import Rating from "../../atoms/Rating/Rating";
import DatePicker from "../../atoms/DatePicker/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import { useData } from "../../../contexts/DataContext";
import Textfield from "../../atoms/Textfield/Textfield";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function ModalComponent(props) {
  const [AestheticScore, setAestheticScore] = useState(0);
  const [FunctionalityScore, setFunctionalityScore] = useState(0);
  const [AestheticHover, setAestheticHover] = useState(-1);
  const [FunctionalityHover, setFunctionalityHover] = useState(-1);

  const {
    state,
    handleProductIndividualChange,
    updateLocationRefs,
    updateDecisionRefs,
  } = useData();

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

  const locationRefs = [
    { title: "Hus", key: "house" },
    { title: "Rum", key: "room" },
    { title: "Hylla", key: "shelf" },
    { title: "Våning", key: "floor" },
  ];

  const decisionRefs = [
    { title: "Materialval", key: "materialChoice" },
    { title: "Budgetjustering", key: "budgetAdjustment" },
    { title: "Teknisk lösning", key: "technicalSolution" },
    { title: "Konstruktionsförändring", key: "constructionChange" },
  ];

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const individual = state.productIndividual.find(
    (ind) => ind.id === props.rowId
  );

  const handleLocationRefChange = (key, value) => {
    updateLocationRefs(key, value);
  };

  const handleDecisionRefChange = (key, value) => {
    updateDecisionRefs(key, value);
  };

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
          <Box className={styles.headerContainer}>
            <h1 id="modal-modal-title">Status och platsinformation</h1>
            <Box className={styles.closeIconContainer}>
              <CloseIcon onClick={props.handleClose} />
            </Box>
          </Box>
          <Box className={styles.ratingContainer}>
            <Rating
              title="Estetiskt skick"
              id="aesthetic"
              value={AestheticScore}
              hover={AestheticHover}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setAestheticScore(newValue);
                handleProductIndividualChange(
                  props.rowId,
                  "aesthetic",
                  newValue
                );
              }}
              onChangeActive={(event, newHover) => {
                setAestheticHover(newHover);
              }}
              labels={labels}
            />
            <Rating
              title="Funktionellt skick"
              id="functionality"
              value={FunctionalityScore}
              hover={FunctionalityHover}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setFunctionalityScore(newValue);
                handleProductIndividualChange(
                  props.rowId,
                  "functionality",
                  newValue
                );
              }}
              onChangeActive={(event, newHover) => {
                setFunctionalityHover(newHover);
              }}
              labels={labels}
            />
          </Box>
          <Box sx={{width:'95%'}}>
            <DatePicker
              title1="Datum tillgänglig/-a"
              title2="Datum första möjliga leverans"
              onChange={handleProductIndividualChange}
              rowId={props.rowId}
              dateAvailable={individual.dateAvailable}
              deliveryDate={individual.deliveryDate}
            />
          </Box>
          <Box>
            <Box className={styles.dropdownContainer}>
              <Box className={styles.plusCommentContainer}>
                <Dropdown
                  size="large"
                  title="Demonterbarhet"
                  options={deconstructionOptions}
                  onOptionChange={(value) =>
                    handleProductIndividualChange(
                      props.rowId,
                      "deconstruction",
                      value
                    )
                  }
                  id="deconstruction"
                  value={individual.deconstruction || ""}
                />
                <Link href="#" variant="body2">
                  Lägg till kommentar
                </Link>
              </Box>
              <Box className={styles.plusCommentContainer}>
                <Dropdown
                  size="large"
                  title="Åtkomlighet"
                  options={accessibilityOptions}
                  onOptionChange={(value) =>
                    handleProductIndividualChange(
                      props.rowId,
                      "accessibility",
                      value
                    )
                  }
                  id="accessibility"
                  value={individual.accessibility || ""}
                />
                <Link href="#" variant="body2" color="primary">
                  Lägg till kommentar
                </Link>
              </Box>
            </Box>
          </Box>

          <Box className={styles.textfieldContainer}>
            {locationRefs.map(({ title, key }) => (
              <Textfield
                size="medium"
                key={key}
                title={title}
                onChange={(value) => handleLocationRefChange(key, value)}
                value={state.locationRefs[key] || ""}
              />
            ))}
            <HelpOutlineIcon className={styles.questionMark} />
          </Box>
          <Box className={styles.textfieldContainer}>
            {decisionRefs.map(({ title, key }) => (
              <Textfield
                size="medium"
                key={key}
                title={title}
                onChange={(value) => handleDecisionRefChange(key, value)}
                value={state.decisionRefs[key] || ""}
              />
            ))}
            <HelpOutlineIcon className={styles.questionMark} />
          </Box>
          <Box className={styles.buttonContainer}>
            <CustomButton
              text="Stäng"
              variant="outlined"
              onClick={props.handleClose}
            />
            <CustomButton
              text="Spara"
              variant="contained"
              onClick={props.handleClose}
            />
          </Box>
        </Paper>
      </Modal>
    </>
  );
}
