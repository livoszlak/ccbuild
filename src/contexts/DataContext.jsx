import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useSupabase } from "../hooks/useSupabase";

const DataContext = createContext();

// Initial state for data context - we will add more here for each step
const initialState = {
  mainCategories: [],
  organisations: [],
  productCard: [],
  productIndividual: [],
  /*  productInformation: [], */
  product_form: [],
  product_properties: [],
  projects: [],
  subcategoriesPrimary: [],
  subcategoriesSecondary: [],
  user_organisations: [],
  users: [],
  loading: true,
  error: null,
  selectedMainCategory: null,
  selectedSubcategoryPrimary: null,
  selectedSubcategorySecondary: null,
  project: null,
  productName: "",
  isProductNameManuallyEdited: false,
  lastAutoGeneratedName: "",
  interalId: "",
  productDescription: "",
  selectedPropertyKeys: {},
  form: {
    material: "",
    finish: "",
    measurementUnit: "",
    width: null,
    depth: null,
    height: null,
    diameter: null,
    length: null,
    thickness: null,
    weightPer: null,
    weightUnit: "",
  },
  productInformation: {
    manufacturer: "",
    itemNumber: "",
    manufacturedYear: "",
    purchasedYear: "",
    GTIN: "",
    RSK: "",
    ENR: "",
    BSAB: "",
    BK04: "",
  },
  marketplace: {
    newPrice: "",
    externalPrice: "",
    internalPrice: "",
    buyerSuggestPrice: false,
    ship: false,
    pickUp: false,
    adress: "",
    comment: "",
    contactPerson: "",
    phone: "",
  },
  productIndividuals: {
    amount: 0,
    status: "",
    marketplace: "",
    locationRefs: {},
    decisionRefs: {},
    dateAvailable: null,
    devliveryDate: null,
    deconstruction: "",
    accessibility: "",
    deconstructionComment: "",
    accessibilityComment: "",
    aestheticsRating: null,
    functionalityRating: null,
  },
};

// Reducer function to manage state updates based on dispatched actions
function dataReducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      console.log(`Setting data for ${action.table}`, action.data);
      return { ...state, [action.table]: action.data, loading: false };
    case "SET_ERROR":
      console.error(`Error fetching data: ${action.error}`);
      return { ...state, error: action.error, loading: false };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.table]: state[action.table].map((item) =>
          item.id === action.id
            ? { ...item, [action.field]: action.value }
            : item
        ),
      };
    case "SET_PROJECT":
      return { ...state, project: action.payload };
    case "SET_SELECTED_MAIN_CATEGORY":
      return {
        ...state,
        selectedMainCategory: action.payload,
        isProductNameManuallyEdited: false,
      };
    case "SET_SELECTED_SUBCATEGORY_PRIMARY":
      return {
        ...state,
        selectedSubcategoryPrimary: action.payload,
        isProductNameManuallyEdited: false,
      };
    case "SET_SELECTED_SUBCATEGORY_SECONDARY":
      return {
        ...state,
        selectedSubcategorySecondary: action.payload,
        isProductNameManuallyEdited: false,
      };
    case "SET_PRODUCT_NAME":
      return {
        ...state,
        productName: action.payload,
        isProductNameManuallyEdited: action.isManualEdit,
      };
    case "SET_AUTO_GENERATED_NAME":
      return {
        ...state,
        lastAutoGeneratedName: action.payload,
        productName: state.isProductNameManuallyEdited
          ? state.productName
          : action.payload,
        isProductNameManuallyEdited: false,
      };
    case "RESET_PRODUCT_NAME_EDIT_FLAG":
      return { ...state, isProductNameManuallyEdited: false };
    case "SET_INTERNAL_ID":
      return { ...state, internalId: action.payload };
    case "SET_PRODUCT_DESCRIPTION":
      return { ...state, productDescription: action.payload };
    case "SET_PROPERTY_KEYS":
      return {
        ...state,
        selectedPropertyKeys: action.payload,
      };
    case "UPDATE_PROPERTY_KEY":
      return {
        ...state,
        selectedPropertyKeys: {
          ...state.selectedPropertyKeys,
          [action.payload.key]: action.payload.value,
        },
      };
    case "UPDATE_FORM":
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.key]: action.payload.value,
        },
      };

    case "UPDATE_PRODUCT_INFO":
      return {
        ...state,
        productInformation: {
          ...state.productInformation,
          [action.payload.key]: action.payload.value,
        },
      };

    case "RESET_PROPERTY_KEYS":
      return {
        ...state,
        selectedPropertyKeys: {},
      };

    //--- Step 5 - marketplace --- //
    case "SET_NEW_PRICE":
      return {
        ...state,
        marketplace: { ...state.marketplace, newPrice: action.payload },
      };
    case "SET_EXTERNAL_PRICE":
      return {
        ...state,
        marketplace: { ...state.marketplace, externalPrice: action.payload },
      };
    case "SET_INTERNAL_PRICE":
      return {
        ...state,
        marketplace: { ...state.marketplace, internalPrice: action.payload },
      };
    case "SET_BUYER_SUGGEST_PRICE":
      return {
        ...state,
        marketplace: {
          ...state.marketplace,
          buyerSuggestPrice: action.payload,
        },
      };
    case "SET_SHIP":
      return {
        ...state,
        marketplace: { ...state.marketplace, ship: action.payload },
      };
    case "SET_PICKUP":
      return {
        ...state,
        marketplace: { ...state.marketplace, pickUp: action.payload },
      };
    case "SET_ADRESS":
      return {
        ...state,
        marketplace: { ...state.marketplace, adress: action.payload },
      };
    case "SET_COMMENT":
      return {
        ...state,
        marketplace: { ...state.marketplace, comment: action.payload },
      };
    case "SET_CONTACT_PERSON":
      return {
        ...state,
        marketplace: { ...state.marketplace, contactPerson: action.payload },
      };
    case "SET_PHONE":
      return {
        ...state,
        marketplace: { ...state.marketplace, phone: action.payload },
      };

    default:
      return state;
  }
}

// Data provider to wrap the application
export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const { fetchData } = useSupabase();

  useEffect(() => {
    // Fetches all data from our database - if we add more tables we need to add them here as well if we want to use the data (obviously)
    async function fetchAllData() {
      const tables = [
        "mainCategories",
        "organisations",
        "productCard",
        "productIndividual",
        "productInformation",
        "product_form",
        "product_properties",
        "projects",
        "subcategoriesPrimary",
        "subcategoriesSecondary",
        "user_organisations",
        "users",
        "marketplace",
      ];
      try {
        for (const table of tables) {
          const data = await fetchData(table);

          if (data) {
            dispatch({ type: "SET_DATA", table, data });
          }
          // Add a delay of 100ms between requests for less risk of overwhelm (which was an issue)
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } catch (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
      }
    }

    fetchAllData();
  }, []); // Empty dependency array to run only once

  // Function to update a specific field in a table
  const updateField = (table, id, field, value) => {
    dispatch({ type: "UPDATE_FIELD", table, id, field, value });
  };

  // Functions to set different states in our context - we will add more here as we go!
  const setProject = (id) => {
    dispatch({ type: "SET_PROJECT", payload: id });
  };

  const setMainCategory = (id) => {
    dispatch({ type: "SET_SELECTED_MAIN_CATEGORY", payload: id });
  };

  const setSubcategoryPrimary = (id) => {
    dispatch({ type: "SET_SELECTED_SUBCATEGORY_PRIMARY", payload: id });
  };

  const setSubcategorySecondary = (id) => {
    dispatch({ type: "SET_SELECTED_SUBCATEGORY_SECONDARY", payload: id });
  };

  const setProductName = (value, isManualEdit = true) => {
    dispatch({ type: "SET_PRODUCT_NAME", payload: value, isManualEdit });
  };

  const setInternalId = (value) => {
    dispatch({ type: "SET_INTERNAL_ID", payload: value });
  };

  const setProductDescription = (value) => {
    dispatch({ type: "SET_PRODUCT_DESCRIPTION", payload: value });
  };

  const setPropertyKey = (key, value) => {
    dispatch({ type: "SET_PROPERTY_KEY", payload: { key, value } });
  };

  const resetPropertyKeys = () => {
    dispatch({ type: "RESET_PROPERTY_KEYS" });
  };

  // --- Step 5 - Marketplace --- //
  const setNewPrice = (value) => {
    dispatch({ type: "SET_NEW_PRICE", payload: value });
  };

  const setExternalPrice = (value) => {
    dispatch({ type: "SET_EXTERNAL_PRICE", payload: value });
  };

  const setInternalPrice = (value) => {
    dispatch({ type: "SET_INTERNAL_PRICE", payload: value });
  };

  const setBuyerSuggestPrice = (value) => {
    dispatch({ type: "SET_BUYER_SUGGEST_PRICE", payload: value });
  };

  const setShip = (value) => {
    dispatch({ type: "SET_SHIP", payload: value });
  };

  const setPickup = (value) => {
    dispatch({ type: "SET_PICKUP", payload: value });
  };

  const setAdress = (value) => {
    dispatch({ type: "SET_ADRESS", payload: value });
  };
  const setComment = (value) => {
    dispatch({ type: "SET_COMMENT", payload: value });
  };

  const setContactPerson = (value) => {
    dispatch({ type: "SET_CONTACT_PERSON", payload: value });
  };

  const setPhone = (value) => {
    dispatch({ type: "SET_PHONE", payload: value });
  };
  // Function to update the product name based on selected categories. Also checks if user has edited the suggested name manually and if so does an early return
  const updateProductName = () => {
    const category = state.mainCategories.find(
      (cat) => cat.id.toString() === state.selectedMainCategory
    );
    const subcategory1 = state.subcategoriesPrimary.find(
      (sub) => sub.id.toString() === state.selectedSubcategoryPrimary
    );
    const subcategory2 = state.subcategoriesSecondary.find(
      (sub) => sub.id.toString() === state.selectedSubcategorySecondary
    );

    let productName = category ? category.name : "";
    if (subcategory1) productName += ` - ${subcategory1.name}`;
    if (subcategory2) productName += ` - ${subcategory2.name}`;

    dispatch({ type: "SET_AUTO_GENERATED_NAME", payload: productName });
  };

  // Updates productName when selected categories change
  useEffect(() => {
    updateProductName();
  }, [
    state.selectedMainCategory,
    state.selectedSubcategoryPrimary,
    state.selectedSubcategorySecondary,
  ]);

  const updateForm = (key, value) => {
    dispatch({ type: "UPDATE_FORM", payload: { key, value } });
  };

  const updateProductInfo = (key, value) => {
    dispatch({ type: "UPDATE_PRODUCT_INFO", payload: { key, value } });
  };

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        updateField,
        setProject,
        setMainCategory,
        setSubcategoryPrimary,
        setSubcategorySecondary,
        setProductName,
        setInternalId,
        setProductDescription,
        setPropertyKey,
        resetPropertyKeys,
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
        updateForm,
        updateProductInfo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
