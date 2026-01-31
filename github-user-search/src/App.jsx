import Search from "./components/Search";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <h1 className="text-3xl font-bold text-center pt-8">
        GitHub User Search
      </h1>
      <Search />
    </div>
  );
}
