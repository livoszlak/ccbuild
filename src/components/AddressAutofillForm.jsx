import React, { useState, useRef } from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import Textfield from "./atoms/Textfield/Textfield";
import { useData } from "../contexts/DataContext";
import { Typography } from "@mui/material";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoib3N6bGFrIiwiYSI6ImNtMTd1MzRuYzBzdnEyanI0NGl6eXVoZGkifQ.rETLfeVeOVdVZSpOjR-U4w";

const AddressAutofillForm = () => {
  const { state, setAdress } = useData();
  const [fullAddress, setFullAddress] = useState(null);
  const addressRef = useRef(null);

  const handleAddressChange = (value) => {
    setAdress(value);
  };

  const handleRetrieve = (result) => {
    const { features } = result;

    if (features && features.length > 0) {
      const feature = features[0];

      let streetAddress = feature.properties.address_line1;
      let postcode = feature.properties.postcode;
      let city = feature.properties.place;

      const fullAddressString = `${streetAddress}, ${postcode} ${city}`;
      setFullAddress(fullAddressString);
      setAdress(fullAddressString);
    }
  };

  return (
    <div>
      <AddressAutofill
        accessToken={MAPBOX_ACCESS_TOKEN}
        onRetrieve={handleRetrieve}
      >
        <Textfield
          title="Adress"
          placeholder="Upphämtningsadress"
          type="text"
          onChange={handleAddressChange}
          value={state.marketplace.adress || ""}
          ref={addressRef}
          autoComplete="street-address"
        />
      </AddressAutofill>
      {fullAddress && <Typography>{state.marketplace.adress}</Typography>}
    </div>
  );
};

export default AddressAutofillForm;
