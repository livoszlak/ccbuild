import { Box, Checkbox, Typography, Button} from "@mui/material";
import Textfield from "../../atoms/Textfield/Textfield";
import { FormControlLabel } from "@mui/material";
import AddressAutofillForm from "../../AddressAutofillForm";
import styles from "./Step5.module.css";
import CheckBox from "../../atoms/Checkbox/Checkbox";

export default function Step5() {
  return (
    <>
      <h1>Hantering för marknadsplats</h1>
      <Typography>Alla priser ska anges exklusive moms!</Typography>
      <Box className={styles.smallContainer}>
        <Textfield title="Nypris / st" placeholder="Nypris"/>  
        <Button variant="contained">Uppskatta nypris </Button>
      </Box>
      <Typography sx={{color: 'grey', fontSize: '12px'}}> Hur beräknas det uppskattade priset? <a>Läs mer</a></Typography>
      <Box className={styles.smallContainer}>
        <Textfield title="Externt pris / st" placeholder="Externt Pris"/>
        <Button variant="contained">Uppskatta externt pris </Button>
      </Box>
      <Typography sx={{color: 'grey', fontSize: '12px'}}> Hur beräknas det uppskattade priset? <a>Läs mer</a></Typography>
      <Textfield title="Intern pris / st"  placeholder="Internt Pris" />
      <CheckBox name="letBuyerSuggestPrice" text="Låt köparen föreslå pris"/>
      <AddressAutofillForm />
      <Box className={styles.smallContainer}>
        <CheckBox name="Ship" text="Kan skickas med frakt"/>
        <CheckBox name="Pickup" text="Kan hämtas på plats"/>
      </Box>
      <Textfield  title="Kommentar" />
      <Box className={styles.smallContainer}>
        <Textfield title="Kontaktperson" placeholder="Namn Namnsson"/>
        <Textfield title="Telefon" placeholder="07x xxx xx xx" />
      </Box>
           
    </>
  );
}