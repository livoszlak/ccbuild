import { useState } from "react";
import { Rating, Box } from "@mui/material";
import styles from "./Rating.module.css";

export default function RatingComponent(props) {
    return(
        <Box className={styles.wrapper}>
        <h3>{props.title}</h3>
        <Box className={styles.container}>
        <Rating id={props.id} value={props.value} precision={1} getLabelText={props.getLabelText} onChange={props.onChange} onChangeActive={props.onChangeActive}/>
              {props.value !== null && (
        <Box className={styles.ratingText}>{props.labels[props.hover !== -1 ? props.hover: props.value]}</Box>
      )}
    </Box>
    </Box>
    );
}