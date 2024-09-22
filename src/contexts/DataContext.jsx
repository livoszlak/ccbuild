import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useSupabase } from "../hooks/useSupabase";

const DataContext = createContext();

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
};

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
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const { fetchData } = useSupabase();

  useEffect(() => {
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
          await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay of 100ms between requests for less risk of overwhelm
        }
      } catch (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
      }
    }

    fetchAllData();
  }, []); // Empty dependency array to run only once

  const updateField = (table, id, field, value) => {
    dispatch({ type: "UPDATE_FIELD", table, id, field, value });
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

  return (
    <DataContext.Provider
      value={{
        state,
        updateField,
        setMainCategory,
        setSubcategoryPrimary,
        setSubcategorySecondary,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
