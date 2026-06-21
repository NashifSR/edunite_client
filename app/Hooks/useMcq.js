import axios from "axios";
import { useState, useEffect } from "react";

const useMCQ = () => {
  // 1. Initialize all state variables with standard default structures
  const [mcq, setMcq] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  // Updated pointing directly to your live backend server endpoint asset ecosystem
  const API_URL = "http://localhost:5000/api/tvet/mcqQuestions"; 

  // 2. Define the unified fetching function
  const fetchMCQs = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await axios.get(API_URL);
      
      // Defensively parse for nested arrays inside server wrappers (res.data.data)
      const rawData = response.data?.data || response.data || [];
      const normalizedData = Array.isArray(rawData) ? rawData : [];

      setMcq(normalizedData);
    } catch (err) {
      console.error("MCQ data layer processing error:", err);
      setIsError(true);
      setError(err);
      setMcq([]); // Graceful structural fallback containment grid
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Execution lifecycle loop mount matrix
  useEffect(() => {
    fetchMCQs();
  }, []); 
  
  // 4. Exposed reference handle for manual grid refetch requests
  const refetch = fetchMCQs; 

  // 5. Destructured state delivery node
  return { mcq, refetch, isLoading, isError, error };
};

export default useMCQ;