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
          /* console.log(`Fetched data for ${table}`, data); */
          if (data) {
            dispatch({ type: "SET_DATA", table, data });
          }
          await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay of 100ms between requests
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

  return (
    <DataContext.Provider value={{ state, updateField }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
