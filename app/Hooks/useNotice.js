import { useState, useEffect } from 'react';
import axios from 'axios';

const useNotice = () => {
  // 1. Initialize all state variables
  const [notice, setNotice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  // 2. Define the fetching function
  const fetchnotices = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await axios.get("/notice.json");
      setNotice(response.data); // Axios automatically gives the data in response.data
    } catch (err) {
      setIsError(true);
      setError(err);
      setNotice([]); // Clear data on error
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Use useEffect to run the fetch function once on mount
  useEffect(() => {
    fetchnotices();
    // The dependency array is empty, so it only runs once (on mount)
  }, []); 
  
  // 4. Provide a manual refetch function
  const refetch = fetchnotices; 
  // 5. Return the state and functions
  return { notice, refetch, isLoading, isError, error };
};

export default useNotice;