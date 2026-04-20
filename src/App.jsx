import { Routes, Route } from "react-router-dom";
import { useReducer } from "react";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import SavedPage from "./pages/SavedPage";
import NavBar from "./components/NavBar";

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      if (state.find(p => p.code === action.product.code)) return state;
      return [...state, action.product];
    case "REMOVE":
      return state.filter(p => p.code !== action.code);
    default:
      return state;
  }
}

export default function App() {
  const [saved, dispatch] = useReducer(reducer, []);

  return (
    <>
      <NavBar count={saved.length}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:barcode" element={<DetailPage saved={saved} dispatch={dispatch} />} />
        <Route path="/saved" element={<SavedPage saved={saved} dispatch={dispatch} />} />
      </Routes>
    </>
  );
}
