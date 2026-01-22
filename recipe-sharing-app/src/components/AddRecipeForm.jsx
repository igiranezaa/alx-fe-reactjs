import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !description) return;

    addRecipe({
      id: Date.now(),
      title,
      description,
    });

    // ✅ IMPORTANT FOR TASK 2
    filterRecipes();

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Recipe</h2>

      <input
        type="text"
        placeholder="Recipe title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Recipe description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
