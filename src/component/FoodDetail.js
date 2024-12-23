import React, { useEffect, useState } from "react";
import styles from "./fooddetail.module.css";
import ItemList from "./ItemList";

export default function FoodDetail({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "ab3a8b2b1cf54667af8b9aadb8a3640e";
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [URL, foodId]);
  return (
    <div className={styles.recipeCard}>
      <div>
        {/* Food Details {foodId} */}
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
      </div>
      <div className={styles.recipeDetails}>
        <span>
          <strong>⏱️ {food.readyInMinutes} Minutes</strong>
        </span>
        <span>
          <strong>🧑‍🧑‍🧒‍🧒 Serves {food.servings}</strong>
        </span>
        <span>
          <strong>
            {food.vegetarian ? "🥕 Vegetarian" : " 🥩 Non Vegetarian"}
          </strong>
        </span>
        <span>
          {" "}
          <strong>{food.vegan ? "🐮 Vegan" : " "} </strong>{" "}
        </span>
      </div>
      <div>
        ${" "}
        <span>
          <strong>{food.pricePerServing / 100} Per serving</strong>
        </span>
      </div>

      <h2>Ingredients</h2>
      <ItemList food={food} isLoading={isLoading} />
      <div className={styles.recipeInstructions}>
        <h2>Instructions</h2>
        <ol>
          {isLoading ? (
            <p> Loading .....</p>
          ) : (
            food.analyzedInstructions[0].steps.map((step) => (
              <li>{step.step}</li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}
