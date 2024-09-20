import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";

export const useSupabase = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (table) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from(table).select("*");

      if (error) throw error;

      setData(data);
      return data; // Ensure data is returned
    } catch (error) {
      setError(error.message);
      return null; // Return null in case of error
    } finally {
      setLoading(false);
    }
  };

  /*   const insertData = async (table, newData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from(table).insert(newData);

      if (error) throw error;

      setData((prevData) => [...prevData, data[0]]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }; */

  return { data, loading, error, fetchData /* , insertData */ };
};
