import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [],

  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );

      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),

  deleteRecipe: (recipeId) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== recipeId);

      return {
        recipes: updatedRecipes,
        favorites: state.favorites.filter((id) => id !== recipeId),
        filteredRecipes: updatedRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),

  // ✅ Task 2: Search + filtering
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  filteredRecipes: [],
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // ✅ Task 3: Favorites + recommendations
  favorites: [],

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  recommendations: [],
  generateRecommendations: () =>
    set((state) => {
      // simple recommendation: recipes NOT in favorites (first 3)
      const recommended = state.recipes
        .filter((recipe) => !state.favorites.includes(recipe.id))
        .slice(0, 3);

      return { recommendations: recommended };
    }),
}));
