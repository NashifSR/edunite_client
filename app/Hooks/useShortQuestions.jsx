import axios from "axios";
import { useState, useEffect } from "react";

const useShortQuestions = () => {
  const [shortQuestions, setShortQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/tvet/shortQuestions");
      
      // Fallback matrix logic checking if the backend wraps the response array inside an object property
      const rawData = response.data?.data || response.data || [];
      
      // Ensure it is strictly formatted as an iterable array
      const normalizedData = Array.isArray(rawData) ? rawData : [];
      
      setShortQuestions(normalizedData);
    } catch (err) {
      console.error("Hook data-layer aggregation failure:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return { shortQuestions, loading, error, refetch: fetchQuestions };
};

export default useShortQuestions;