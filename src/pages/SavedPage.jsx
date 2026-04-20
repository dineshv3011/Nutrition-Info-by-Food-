import { useNavigate } from "react-router-dom";

export default function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate();

  if (saved.length === 0) return <p>No saved items yet</p>;

  return (
    <div>
      <h2>Saved Items</h2>
      {saved.map(item => (
        <div key={item.code}>
          {item.product_name}
          <button onClick={() => navigate(`/product/${item.code}`)}>View</button>
          <button onClick={() => dispatch({ type: "REMOVE", code: item.code })}>Remove</button>
        </div>
      ))}
    </div>
  );
}
