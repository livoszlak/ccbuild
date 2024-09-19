import React, { useState, useCallback, useRef } from "react";
import clsx from "clsx";
import { AddressAutofill, useConfirmAddress } from "@mapbox/search-js-react";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoib3N6bGFrIiwiYSI6ImNtMTd1MzRuYzBzdnEyanI0NGl6eXVoZGkifQ.rETLfeVeOVdVZSpOjR-U4w";

const AddressAutofillForm = () => {
  const [activePage, setActivePage] = useState("shipping");
  const [formData, setFormData] = useState();
  const addressRef = useRef(null);

  const { formRef, showConfirm } = useConfirmAddress({
    accessToken: MAPBOX_ACCESS_TOKEN,
    theme: {
      variables: {
        fontFamily: "Arial, sans-serif",
        unit: "16px",
        padding: "0.5em",
      },
    },
  });

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const result = await showConfirm();

      if (result.type === "nochange") {
        setFormData(new FormData(e.target));
        setActivePage("confirm");
      }
    },
    [showConfirm]
  );

  const handleChangeAddress = () => {
    setActivePage("shipping");
  };

  const handleOrderSubmit = () => {
    setActivePage("complete");
  };

  const handleTryAgain = () => {
    formRef.current.reset();
    setActivePage("shipping");
  };

  let displayAddress;

  if (formData) {
    displayAddress = (
      <>
        {formData.get("first-name")} {formData.get("last-name")}
        <br />
        {formData.get("address")}
        <br />
        {formData.get("address-line2") && (
          <>
            {formData.get("address-line2")} <br />
          </>
        )}
        {formData.get("city")} {formData.get("state")}{" "}
        {formData.get("postcode")}
      </>
    );
  }

  return (
    <div
      className="round border border--gray-lighter px12 py24"
      style={{ minHeight: 550 }}
    >
      <div className="wmax600 mx-auto">
        {/* shipping address page */}
        <div
          className={clsx("address-page", {
            none: activePage !== "shipping",
          })}
        >
          <h4 className="txt-l txt-bold mb6">Shipping Address</h4>

          <form
            className="flex flex--column"
            ref={formRef}
            onSubmit={handleFormSubmit}
          >
            {/* first and last name */}
            <div className="grid grid--gut12">
              <div className="col w-1/2">
                <label className="txt-s txt-bold color-gray mb3">
                  First Name
                  <input className="input mb12" name="first-name" required />
                </label>
              </div>
              <div className="col w-1/2">
                <label className="txt-s txt-bold color-gray mb3">
                  Last Name
                  <input className="input mb12" name="last-name" required />
                </label>
              </div>
            </div>

            {/* address with autofill */}
            <AddressAutofill accessToken={MAPBOX_ACCESS_TOKEN}>
              <input
                ref={addressRef}
                className="input mb12"
                name="address"
                placeholder="Start typing your address..."
                required
              />
            </AddressAutofill>

            {/* address-line2 */}
            <label className="txt-s txt-bold color-gray mb3">
              Apartment, suite, etc. (optional)
              <input
                className="input mb12"
                autoComplete="address-line2"
                name="address-line2"
              />
            </label>

            {/* city, state, postal-code */}
            <div className="grid grid--gut12 mb12">
              <div className="col w-1/3">
                <label className="txt-s txt-bold color-gray mb3">
                  City
                  <input
                    className="input mb12"
                    autoComplete="address-level2"
                    name="city"
                    required
                  />
                </label>
              </div>
              <div className="col w-1/3">
                <label className="txt-s txt-bold color-gray mb3">
                  State / Region
                  <input
                    className="input mb12"
                    autoComplete="address-level1"
                    name="state"
                    required
                  />
                </label>
              </div>
              <div className="col w-1/3">
                <label className="txt-s txt-bold color-gray mb3">
                  ZIP / Postcode
                  <input
                    className="input"
                    autoComplete="postal-code"
                    name="postcode"
                    required
                  />
                </label>
              </div>
            </div>

            {/* continue button */}
            <div className="mb12 submit-btns align-r">
              <button type="submit" className="btn round">
                Continue
              </button>
            </div>
          </form>
        </div>

        {/* confirmation page */}
        <div
          className={clsx("confirm-page", {
            none: activePage === "shipping",
          })}
        >
          <div
            className={clsx("confirm-order-blurb", {
              none: activePage !== "confirm",
            })}
          >
            <h4 className="txt-l txt-bold mb6">Confirm Order</h4>
            <p className="mb24">
              Review your order and shipping details below. This is only an
              example, so we aren't going to ship anything to you.
            </p>
          </div>

          <div
            className={clsx("order-submitted-blurb mb24", {
              none: activePage !== "complete",
            })}
          >
            <h4 className="txt-l txt-bold mb6">Order Submitted!</h4>
            <p className="mb12">Your order is on the way!</p>
            <button
              className="txt-ms border-b color-blue color-blue-dark-on-hover link restart-button inline-block"
              onClick={handleTryAgain}
            >
              Try this example again
            </button>
          </div>

          {/* order details */}
          <div className="round border border--gray-light px18 py6 flex mb24">
            <div className="txt-bold mr24 w60">Order</div>
            <div className="flex-child-grow">
              1 - Mapbox Developer Tee Shirt
            </div>
          </div>

          {/* shipping address */}
          <div className="round border border--gray-light px18 py6 flex mb24">
            <div className="txt-bold mr24 w60">Ship To</div>
            <div className="flex-child-grow" id="shipping-address">
              {displayAddress}
            </div>
            <div className={clsx({ none: activePage !== "confirm" })}>
              <button
                className="txt-ms border-b color-blue color-blue-dark-on-hover link change-address-button"
                onClick={handleChangeAddress}
              >
                Change
              </button>
            </div>
          </div>

          <div
            className={clsx("mb12 submit-btns align-r", {
              none: activePage !== "confirm",
            })}
          >
            <button
              type="submit"
              className="btn round submit-order-button"
              onClick={handleOrderSubmit}
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressAutofillForm;
