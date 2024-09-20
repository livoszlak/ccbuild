import { Button } from "@mui/material"
import styles from "./Button.module.css"
export default function ButtonComponent(props) {
    return (
    <Button className={styles.button}>{props.text}</Button>
);
}