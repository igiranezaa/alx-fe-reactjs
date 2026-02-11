import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import data from "../data.json";

const STORAGE_KEY = "recipes_v1";

function loadRecipesFallback() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(loadRecipesFallback());
  }, []);

  const recipe = useMemo(() => {
    const numId = Number(id);
    return recipes.find((r) => Number(r.id) === numId);
  }, [id, recipes]);

  if (!recipe) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold">Recipe not found</h1>
        <p className="mt-2 text-slate-600">That recipe doesn’t exist (or hasn’t loaded yet).</p>
        <Link
          to="/"
          className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Back
        </Link>
        <Link
          to="/add"
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
        >
          Add a recipe
        </Link>
      </div>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="aspect-[3/2] w-full bg-slate-100">
          <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight">{recipe.title}</h1>
          <p className="mt-2 text-slate-600">{recipe.summary}</p>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold">Ingredients</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                {(recipe.ingredients || []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold">Instructions</h2>
              <ol className="mt-3 list-decimal space-y-3 pl-5 text-slate-700">
                {(recipe.instructions || []).map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
