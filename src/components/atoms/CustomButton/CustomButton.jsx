import { Button } from "@mui/material"
import styles from "./CustomButton.module.css"
export default function CustomButton(props) {
            return <Button variant={props.variant} className={styles.button} onClick={props.onClick} disabled={props.disabled || false}>{props.text}{props.children}</Button>
}