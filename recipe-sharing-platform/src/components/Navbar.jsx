import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    [
      "px-3 py-2 rounded-lg text-sm font-medium transition",
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-700 hover:bg-slate-200 hover:text-slate-900",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600 text-white font-black">
            R
          </div>
          <div className="leading-tight">
            <p className="font-semibold">RecipeShare</p>
            <p className="text-xs text-slate-500">React + Tailwind</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/add" className={linkClass}>
            Add Recipe
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
