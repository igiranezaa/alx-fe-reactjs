import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  return (
    <div>
      <h2>Recipes</h2>

      {filteredRecipes.length === 0 ? (
        <p>{searchTerm ? "No recipes match your search." : "No recipes yet. Add one!"}</p>
      ) : (
        filteredRecipes.map((recipe) => (
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

export default RecipeList;
