import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);

  const favoriteRecipes = favorites
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean);

  return (
    <div style={{ marginTop: 20 }}>
      <h2>My Favorites</h2>

      {favoriteRecipes.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favoriteRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{ border: "1px solid #ddd", padding: 12, marginBottom: 10 }}
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <Link to={`/recipes/${recipe.id}`}>View details</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
