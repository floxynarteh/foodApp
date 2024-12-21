import React, { useEffect, useState } from "react";

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
    <div>
      <div>
        Food Details {foodId}
        {food.title}
        <img src={food.image} alt="" />
      </div>
      <div>
        <span>
          <strong>⏱️ {food.readyInMinutes} Minutes</strong>
        </span>
        <span>
          <strong>🧑‍🧑‍🧒‍🧒 Serves {food.servings}</strong>
        </span>
        <span>{food.vegetarian ? "🥕 Vegetarian" : " 🥩 Non Vegetarian"}</span>
        <span>{food.vegan ? "🐮 Vegan" : " "} </span>
      </div>
      <div>
        $ <span>{food.pricePerServing / 100} Per serving</span>
      </div>
      <div>
        <h2>Ingredients</h2>
        {isLoading ? (
          <p> Loading .....</p>
        ) : (
          food.analyzedInstructions[0].steps[0].ingredients.map((name) => (
            <li>{name.name}</li>
          ))
        )}

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
