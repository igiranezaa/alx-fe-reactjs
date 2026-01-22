import { useParams, Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );

  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Go back</Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(recipe.id);

  return (
    <div>
      <Link to="/">← Back</Link>

      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      {/* ✅ Task 3: Favorite / Unfavorite */}
      <button
        onClick={() =>
          i
