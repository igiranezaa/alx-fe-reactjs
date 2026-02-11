import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import data from "../data.json";

const STORAGE_KEY = "recipes_v1";

function loadRecipes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

function saveRecipes(recipes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export default function AddRecipeForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [summary, setSummary] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const e = {};

    if (!title.trim()) e.title = "Title is required.";
    if (!summary.trim()) e.summary = "Summary is required.";
    if (!ingredients.trim()) e.ingredients = "Ingredients are required.";
    if (!instructions.trim()) e.instructions = "Preparation steps are required.";

    // At least 2 ingredients
    const ingList = ingredients
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
    if (ingredients.trim() && ingList.length < 2) {
      e.ingredients = "Please include at least 2 ingredients (one per line).";
    }

    // Optional image validation (if provided)
    if (image.trim() && !/^https?:\/\/.+/i.test(image.trim())) {
      e.image = "Image must be a valid URL starting with http:// or https://";
    }

    return e;
  }, [title, summary, ingredients, instructions, image]);

  const hasErrors = Object.keys(errors).length > 0;

  function onSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (hasErrors) return;

    const existing = loadRecipes();
    const nextId =
      existing.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0) + 1;

    const newRecipe = {
      id: nextId,
      title: title.trim(),
      summary: summary.trim(),
      image: image.trim() || "https://via.placeholder.com/600x400",
      ingredients: ingredients
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean),
      instructions: instructions
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean),
    };

    const updated = [newRecipe, ...existing];
    saveRecipes(updated);

    navigate(`/recipe/${nextId}`);
  }

  const fieldClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

  const labelClass = "text-sm font-semibold text-slate-800";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Back
        </Link>
        <div className="text-sm text-slate-600">Add a new recipe</div>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-xl font-bold">Submit a Recipe</h1>
        <p className="mt-2 text-sm text-slate-600">
          Fill all fields. Put <span className="font-semibold">one ingredient per line</span> and{" "}
          <span className="font-semibold">one step per line</span>.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-2">
            <label className={labelClass}>Title *</label>
            <input
              className={fieldClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Banana Pancakes"
            />
            {touched && errors.title && (
              <p className="text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Image URL (optional)</label>
            <input
              className={fieldClass}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
            />
            {touched && errors.image && (
              <p className="text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          <div className="space-y-2 lg:col-span-2">
            <label className={labelClass}>Summary *</label>
            <textarea
              className={fieldClass + " min-h-[96px]"}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="A short, catchy description..."
            />
            {touched && errors.summary && (
              <p className="text-sm text-red-600">{errors.summary}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Ingredients * (one per line)</label>
            <textarea
              className={fieldClass + " min-h-[180px]"}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder={"2 eggs\n1 cup flour\n1 banana"}
            />
            {touched && errors.ingredients && (
              <p className="text-sm text-red-600">{errors.ingredients}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Preparation steps * (one per line)</label>
            <textarea
              className={fieldClass + " min-h-[180px]"}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder={"Mix ingredients\nHeat pan\nCook both sides"}
            />
            {touched && errors.instructions && (
              <p className="text-sm text-red-600">{errors.instructions}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Recipes are saved to <span className="font-semibold">localStorage</span> (mock persistence).
          </p>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:opacity-60"
            disabled={touched && hasErrors}
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
