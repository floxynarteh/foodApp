import React, { useEffect, useState } from "react";
import styles from "./search.module.css";
const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "ab3a8b2b1cf54667af8b9aadb8a3640e";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");
  //Syntax of the useEffect hook(CallBack function, Dependency Array). It's used to call an external parameter eg.API
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data.results);
      setFoodData(data.results);
    }
    fetchFood();
  }, [query, setFoodData]);
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
    </div>
  );
}
