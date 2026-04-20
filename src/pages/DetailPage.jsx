import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      const res = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      if (!cancelled) setProduct(res.data.product);
    }
    fetchData();
    return () => { cancelled = true; };
  }, [barcode]);

  if (!product) return <p>Loading...</p>;

  const isSaved = saved.find(p => p.code === barcode);

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{product.product_name}</h2>

      <p>Calories: {product.nutriments?.energy}</p>
      <p>Fat: {product.nutriments?.fat}</p>
      <p>Carbs: {product.nutriments?.carbohydrates}</p>
      <p>Protein: {product.nutriments?.proteins}</p>
      <p>Sugar: {product.nutriments?.sugars}</p>
      <p>Salt: {product.nutriments?.salt}</p>

      <button onClick={() =>
        isSaved
          ? dispatch({ type: "REMOVE", code: barcode })
          : dispatch({ type: "ADD", product })
      }>
        {isSaved ? "Remove" : "Save"}
      </button>
    </div>
  );
}
