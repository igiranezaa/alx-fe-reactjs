import { useState } from "react";
import { useRecipeStore } from "../store/recipeStore";

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateRecipe({
      ...recipe,
      title: title.trim(),
      description: description.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <h3>Edit Recipe</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", width: "100%", padding: 10, marginBottom: 10 }}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={{ display: "block", width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
