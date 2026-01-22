import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";

const Home = () => {
  return (
    <div>
      <SearchBar />
      <AddRecipeForm />
      <RecipeList />

      {/* ✅ Task 3 */}
      <FavoritesList />
      <RecommendationsList />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
