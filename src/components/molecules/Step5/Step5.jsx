import { Checkbox, Typography } from "@mui/material";
import Textfield from "../../atoms/Textfield/Textfield";
import { CheckBox } from "@mui/icons-material";
import { FormControlLabel } from "@mui/material";
import AddressAutofillForm from "../../AddressAutofillForm";

export default function Step5() {
  return (
    <>
      <h1>Hantering för marknadsplats</h1>
      <Typography>Alla priser ska anges exklusive moms!</Typography>
      <Textfield title="Nypris / st" />
      <Textfield title="Externt pris / st" />
      <Textfield title="Intern pris / st" />
      <FormControlLabel
            control={
              <Checkbox name="letBuyerSuggestPrice" />
            }
            label="Låt köparen föreslå pris"
          />
          <AddressAutofillForm />
          <FormControlLabel
            control={
              <Checkbox name="Ship" />
            }
            label="Kan skickas med frakt"
          />
           <FormControlLabel
            control={
              <Checkbox name="PickUp" />
            }
            label="Kan hämtas på plats"
          />
           <Textfield title="Kommentar" />
           <Textfield title="Kontaktperson" />
           <Textfield title="Telefon" />
           
    </>
  );
}