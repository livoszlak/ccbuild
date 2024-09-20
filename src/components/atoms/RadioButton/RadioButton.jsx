import { Box } from "@mui/material";
import styles from "./Property.module.css"

export default function RadioButton(props) {
    return (
        <Box className={styles.container} >
            <h2 className={styles.title}>{props.title}</h2>
            <Box className={styles.radioContainer}>
                {
                    Object.keys(props.values).map((value) => (
                        <label key={value} className={styles.radioButton}>
                            <input type="radio" name="property" value={value} />
                            {props.values[value]}
                        </label>
                    ))
                }
            </Box>
        </Box>
    );
}