import { Box, Checkbox, Typography } from "@mui/material";
import Textfield from "../../atoms/Textfield/Textfield";
import { FormControlLabel } from "@mui/material";
import AddressAutofillForm from "../../AddressAutofillForm";
import styles from "./Step5.module.css";
import CheckBox from "../../atoms/Checkbox/Checkbox";
import EstimateButton from "../../atoms/EstimateButton/EstimateButton";
import { useData } from "../../../contexts/DataContext";
import { Height } from "@mui/icons-material";

export default function Step5() {
  const {
    state,
    dispatch,
    setNewPrice,
    setExternalPrice,
    setInternalPrice,
    setBuyerSuggestPrice,
    setShip,
    setPickup,
    setAdress,
    setComment,
    setContactPerson,
    setPhone,
  } = useData();

  const handleNewPriceChange = (value) => {
    setNewPrice(value);
  };
  const handleExternalPriceChange = (value) => {
    setExternalPrice(value);
  };
  const handleInternalPriceChange = (value) => {
    setInternalPrice(value);
  };
  const handleBuyerSuggestPriceChange = (value) => {
    setBuyerSuggestPrice(value);
  };
  const handleShipChange = (value) => {
    setShip(value);
  };
  const handlePickUpChange = (value) => {
    setPickup(value);
  };
  const handleAdressChange = (address) => {
    setAdress(address);
  };
  const handleCommentChange = (value) => {
    setComment(value);
  };
  const handleContactPersonChange = (value) => {
    setContactPerson(value);
  };
  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  return (
    <>
      <h1>Hantering för marknadsplats</h1>
      <Typography
        sx={{ fontWeight: "var(--semibold)", fontSize: "13px", mb: "16px" }}
      >
        Alla priser ska anges exklusive moms!
      </Typography>
      <Box className={styles.smallContainer}>
        <Textfield
          title="Nypris / st"
          placeholder="Nypris"
          type="number"
          value={state.marketplace.newPrice || ""}
          onChange={handleNewPriceChange}
        />
        <EstimateButton text="Uppskatta nypris" />
      </Box>
      <Typography sx={{ color: "grey", fontSize: "12px" }}>
        Hur beräknas det uppskattade priset? <a>Läs mer</a>
      </Typography>
      <Box className={styles.smallContainer}>
        <Textfield
          title="Externt pris / st"
          placeholder="Externt Pris"
          type="number"
          onChange={handleExternalPriceChange}
          value={state.marketplace.externalPrice || ""}
        />
        <EstimateButton
          text="Uppskatta externt pris"
          onClick={console.log(state.marketplace)}
        />
      </Box>
      <Typography sx={{ color: "grey", fontSize: "12px" }}>
        Hur beräknas det uppskattade priset? <a>Läs mer</a>
      </Typography>
      <Box className={styles.smallContainer}>
        <Textfield
          title="Intern pris / st"
          placeholder="Internt Pris"
          type="number"
          onChange={handleInternalPriceChange}
          value={state.marketplace.internalPrice || ""}
        />
      </Box>
      <CheckBox
        name="letBuyerSuggestPrice"
        text="Låt köparen föreslå pris"
        onChange={handleBuyerSuggestPriceChange}
        checked={true}
      />
      <AddressAutofillForm
        value={state.marketplace.adress}
        onChange={handleAdressChange}
      />
      {state.marketplace.adress && (
        <Box>
          <Typography></Typography>
        </Box>
      )}
      <Box className={styles.checkboxContainer}>
        <CheckBox
          name="Ship"
          text="Kan skickas med frakt"
          onChange={handleShipChange}
        />
        <CheckBox
          name="PickUp"
          text="Kan hämtas på plats"
          onChange={handlePickUpChange}
        />
      </Box>
      <Textfield
        title="Kommentar"
        placeholder="Ange kompletterande info om prissättningen och eventuella garantier, t.ex. om kostnader tillkommer för demontering och frakt, samt möjliga betalningsmetoder såsom faktura eller andra betalsätt"
        type="textarea"
        onChange={handleCommentChange}
        value={state.marketplace.comment || ""}
      />
      <Box className={styles.smallContainer}>
        <Textfield
          title="Kontaktperson"
          placeholder="Namn Namnsson"
          onChange={handleContactPersonChange}
          value={state.marketplace.contactPerson || ""}
        />
        <Textfield
          title="Telefon"
          type="number"
          placeholder="07x xxx xx xx"
          onChange={handlePhoneChange}
          value={state.marketplace.phone || ""}
        />
      </Box>
    </>
  );
}
