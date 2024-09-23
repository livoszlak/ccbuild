import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useSupabase } from "../hooks/useSupabase";

const DataContext = createContext();

// Initial state for data context - we will add more here for each step
const initialState = {
  mainCategories: [],
  organisations: [],
  productCard: [],
  productIndividual: [],
  productInformation: [],
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
  productName: "",
  isProductNameManuallyEdited: false,
  interalId: "",
  productDescription: "",
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
    case "SET_SELECTED_MAIN_CATEGORY":
      return { ...state, selectedMainCategory: action.payload };
    case "SET_SELECTED_SUBCATEGORY_PRIMARY":
      return { ...state, selectedSubcategoryPrimary: action.payload };
    case "SET_SELECTED_SUBCATEGORY_SECONDARY":
      return { ...state, selectedSubcategorySecondary: action.payload };
    case "SET_PRODUCT_NAME":
      return { ...state, productName: action.payload };
    case "RESET_PRODUCT_NAME_EDIT_FLAG":
      return { ...state, isProductNameManuallyEdited: false };
    case "SET_INTERNAL_ID":
      return { ...state, internalId: action.payload };
    case "SET_PRODUCT_DESCRIPTION":
      return { ...state, productDescription: action.payload };
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
  const setMainCategory = (id) => {
    dispatch({ type: "SET_SELECTED_MAIN_CATEGORY", payload: id });
    updateProductName();
  };

  const setSubcategoryPrimary = (id) => {
    dispatch({ type: "SET_SELECTED_SUBCATEGORY_PRIMARY", payload: id });
    updateProductName();
  };

  const setSubcategorySecondary = (id) => {
    dispatch({ type: "SET_SELECTED_SUBCATEGORY_SECONDARY", payload: id });
    updateProductName();
  };

  const setProductName = (value) => {
    dispatch({ type: "SET_PRODUCT_NAME", payload: value });
  };

  const setInternalId = (value) => {
    dispatch({ type: "SET_INTERNAL_ID", payload: value });
  };

  const setProductDescription = (value) => {
    dispatch({ type: "SET_PRODUCT_DESCRIPTION", payload: value });
  };

  // Function to update the product name based on selected categories. Also checks if user has edited the suggested name manually and if so does an early return
  const updateProductName = () => {
    if (state.isProductNameManuallyEdited) return;

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

    dispatch({ type: "SET_PRODUCT_NAME", payload: productName });
    dispatch({ type: "RESET_PRODUCT_NAME_EDIT_FLAG" });
  };

  // Updates productName when selected categories change
  useEffect(() => {
    updateProductName();
  }, [
    state.selectedMainCategory,
    state.selectedSubcategoryPrimary,
    state.selectedSubcategorySecondary,
  ]);

  return (
    <DataContext.Provider
      value={{
        state,
        updateField,
        setMainCategory,
        setSubcategoryPrimary,
        setSubcategorySecondary,
        setProductName,
        setInternalId,
        setProductDescription,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
