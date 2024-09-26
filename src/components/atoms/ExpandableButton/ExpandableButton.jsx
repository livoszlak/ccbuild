import React, { useState } from "react";
import { AddCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import styles from "./ExpandableButton.module.css";

const ExpandableButton = (props) => {
  return (
    <Button
    sx={{backgroundColor: '#f9f9f9', textTransform: 'none'}}
      size={props.size}
      className={
        props.size === "large" ? styles.expandableLarge : styles.expandableSmall
      }
    >
      {props.text}
      <AddCircle className={styles.addIcon} />
    </Button>
  );
};

export default ExpandableButton;
