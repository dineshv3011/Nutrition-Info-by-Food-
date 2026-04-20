import { useState } from "react";
import useFoodSearch from "../hooks/useFoodSearch";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { results, loading, error, searchFood } = useFoodSearch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) {
      setErrorMsg("Enter food name");
      return;
    }
    if (query.length < 2) {
      setErrorMsg("Minimum 2 characters");
      return;
    }
    setErrorMsg("");
    searchFood(query);
  };

  return (
    <div>
      <h2>Search Food</h2>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {errorMsg && <ErrorMessage message={errorMsg} />}
      {error && <ErrorMessage message={error} />}
      {loading && <p>Loading...</p>}

      {results.map(item => (
        <div className="card" key={item.code} onClick={() => navigate(`/product/${item.code}`)}>
          {item.product_name}
        </div>
      ))}
    </div>
  );
}
