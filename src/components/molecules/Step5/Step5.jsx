import { Box, Typography, IconButton } from "@mui/material";
import Textfield from "../../atoms/Textfield/Textfield";
import AddressAutofillForm from "../../AddressAutofillForm";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import styles from "./Step5.module.css";
import CheckBox from "../../atoms/Checkbox/Checkbox";
import EstimateButton from "../../atoms/EstimateButton/EstimateButton";
import { useData } from "../../../contexts/DataContext";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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

  // Extract the first entry from the options array
  const contactPersonOptions = state.users.reduce((acc, user) => {
    acc[user.name] = user.name;
    return acc;
  }, {});
  const firstContactPerson = Object.keys(contactPersonOptions)[0];

  // Set the initial value of contactPerson if not already set
  if (!state.marketplace.contactPerson && firstContactPerson) {
    setContactPerson(firstContactPerson);
  }

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
  const handleAdressChange = (value) => {
    setAdress(value);
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
    <Box>
      <h1>Hantering för marknadsplats</h1>
      <Typography sx={{fontWeight: 'var(--semibold)', fontSize: '13px', mt: '32px', mb: "-16px"}}>Alla priser ska anges exklusive moms!</Typography>
      <Box className={styles.priceContainer}>
        <Textfield
          title="Nypris / st"
          placeholder="Nypris"
          type="number"
          size="large"
          value={state.marketplace.newPrice || ""}
          onChange={handleNewPriceChange}
        />
        <Box>
        <EstimateButton text="Uppskatta nypris" />
        </Box>
        <IconButton sx={{marginLeft: '-10px', p: 0, mb: '5px'}}>
            <HelpOutlineIcon color="primary"/>
        </IconButton>
      </Box>
      <Typography sx={{ color: "grey", fontSize: "12px", mb:'-16px' }}>
        Hur beräknas det uppskattade priset? <a>Läs mer</a>
      </Typography>
      <Box className={styles.priceContainer}>
        <Textfield
          title="Externt pris / st"
          placeholder="Externt Pris"
          type="number"
          size="large"
          onChange={handleExternalPriceChange}
          value={state.marketplace.externalPrice || ""}
        />
        <Box>
        <EstimateButton text="Uppskatta externt pris"/>
        </Box>
        <IconButton sx={{marginLeft: '-10px', p: 0, mb: '5px'}}>
            <HelpOutlineIcon color="primary"/>
        </IconButton>
      </Box>
      <Typography sx={{ color: "grey", fontSize: "12px", mb:"-16px"}}>
        Hur beräknas det uppskattade priset? <a>Läs mer</a>
      </Typography>
        <Textfield
          title="Intern pris / st"
          placeholder="Internt Pris"
          type="number"
          onChange={handleInternalPriceChange}
          value={state.marketplace.internalPrice || ""}
        />
      <CheckBox
        name="letBuyerSuggestPrice"
        text="Låt köparen föreslå pris"
        onChange={handleBuyerSuggestPriceChange}
        value={state.marketplace.buyerSuggestPrice}
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
        value={state.marketplace.ship}
          name="Ship"
          text="Kan skickas med frakt"
          onChange={handleShipChange}
        />
        <CheckBox
        value={state.marketplace.pickUp}
          name="PickUp"
          text="Kan hämtas på plats"
          onChange={handlePickUpChange}
        />
      </Box>
      <Textfield title="Kommentar" placeholder="Ange kompletterande info om prissättningen och eventuella garantier, tex om kostnader tillkommer för demontering och frakt, samt möjliga betalningsmetoder såsom faktura eller andra betalsätt." type='textarea' onChange={handleCommentChange} value={state.marketplace.comment || ""} />
      <Box className={styles.smallContainer}>
        <Dropdown
          title="Kontaktperson"
          options={contactPersonOptions}
          onOptionChange={handleContactPersonChange}
          value={state.marketplace.contactPerson || firstContactPerson}
          id="contactPerson"
        />
        <Textfield
          title="Telefon"
          type="number"
          placeholder="07x xxx xx xx"
          onChange={handlePhoneChange}
          value={state.marketplace.phone || ""}
        />
      </Box>
    </Box>
  );
}
