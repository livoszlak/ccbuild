import {Modal, Typography, Paper, Box, Button } from '@mui/material';
import styles from './Modal.module.css';
import { useState } from 'react';
import Rating from '../../atoms/Rating/Rating'; 

export default function ModalComponent (props) {
    const [AestheticScore, setAestheticScore] = useState(0);
    const [FunctionalityScore, setFunctionalityScore] = useState(0);
    const [AestheticHover, setAestheticHover] = useState(-1);
    const [FunctionalityHover, setFunctionalityHover] = useState(-1);
    
    const labels = {
        0: 'Ej Bedömd',
        1: 'Skada går ej att åtgärda',
        2: 'Skada är svår att åtgärda',
        3: 'Skada går att åtgärda av proffs',
        4: 'Skada går att åtgärda av lekman',
        5: 'Inga Skador',
      };
      
      function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
      }

    return (
    <Modal 
  className={styles.modalContainer}
  open={props.open}
  onClose={props.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Paper className={styles.modal}>
    <h1 id="modal-modal-title">
      Status och platsinformation
    </h1>
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
    <Button className={styles.buttonPosition} onClick={props.handleClose}>Stäng</Button>
  </Paper>
</Modal>
);
}