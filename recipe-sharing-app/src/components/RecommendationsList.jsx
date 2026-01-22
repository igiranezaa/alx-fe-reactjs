import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Recommendations</h2>
        <button onClick={generateRecommendations}>Generate</button>
      </div>

      {recommendations.length === 0 ? (
        <p>Click “Generate” to see recommendations.</p>
      ) : (
        recommendations.map((recipe) => (
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

export default RecommendationsList;
