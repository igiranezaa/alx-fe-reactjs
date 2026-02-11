import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import data from "../data.json";

const STORAGE_KEY = "recipes_v1";

function loadRecipes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  // first run: seed with data.json
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(loadRecipes());
  }, []);

  const count = useMemo(() => recipes.length, [recipes]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Recipe Sharing Platform</h1>
        <p className="mt-2 text-slate-600">
          Browse recipes, view details, or add your own. Built with React + Tailwind.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
          <span className="font-semibold">{count}</span>
          <span>recipes available</span>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => (
            <Link
              key={r.id}
              to={`/recipe/${r.id}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="aspect-[3/2] w-full overflow-hidden bg-slate-100">
                <img
                  src={r.image}
                  alt={r.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-5">
                <h2 className="text-lg font-semibold text-slate-900">{r.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{r.summary}</p>

                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
                  <span>View recipe</span>
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Tip: The grid adapts with Tailwind responsive classes: <span className="font-mono">sm:</span> and{" "}
          <span className="font-mono">lg:</span>.
        </p>
      </section>
    </div>
  );
}
