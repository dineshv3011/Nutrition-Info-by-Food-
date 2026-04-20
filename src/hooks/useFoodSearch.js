import { useState } from "react";
import axios from "axios";

export default function useFoodSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchFood = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("https://world.openfoodfacts.org/cgi/search.pl", {
        params: { search_terms: query, json: 1 }
      });
      setResults(res.data.products);
    } catch (err) {
      if (err.response) setError("Server error");
      else if (err.request) setError("No internet");
      else setError("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchFood };
}
