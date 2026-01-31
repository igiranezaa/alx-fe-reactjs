import { useState } from "react";
import {
  fetchUserData,
  searchUsersAdvanced,
  fetchUserDetails,
} from "../services/githubService";

export default function Search() {
  const [mode, setMode] = useState("basic");

  const [username, setUsername] = useState("");
  const [basicUser, setBasicUser] = useState(null);

  const [term, setTerm] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBasic = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await fetchUserData(username);
      setBasicUser(data);
    } catch {
      setError("Looks like we cant find the user");
    }
    setLoading(false);
  };

  const runAdvanced = async (nextPage = 1) => {
    setLoading(true);
    setError("");

    try {
      const data = await searchUsersAdvanced({ term, location, minRepos, page: nextPage });
      setTotalCount(data.total_count);

      const fullUsers = await Promise.all(
        data.items.map((u) => fetchUserDetails(u.url))
      );

      if (nextPage === 1) setResults(fullUsers);
      else setResults((prev) => [...prev, ...fullUsers]);

      setPage(nextPage);
    } catch {
      setError("Looks like we cant find the user");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode("basic")} className="px-3 py-2 bg-slate-800 text-white rounded">Basic</button>
        <button onClick={() => setMode("advanced")} className="px-3 py-2 bg-slate-200 rounded">Advanced</button>
      </div>

      {mode === "basic" && (
        <form onSubmit={handleBasic} className="flex gap-2">
          <input className="border p-2 flex-1" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        </form>
      )}

      {mode === "advanced" && (
        <div className="grid gap-2 mb-4">
          <input className="border p-2" placeholder="Keyword" value={term} onChange={(e) => setTerm(e.target.value)} />
          <input className="border p-2" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <input className="border p-2" type="number" placeholder="Min repos" value={minRepos} onChange={(e) => setMinRepos(e.target.value)} />
          <button onClick={() => runAdvanced(1)} className="bg-blue-600 text-white p-2 rounded">Search</button>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="space-y-4">
        {mode === "basic" && basicUser && (
          <div className="border p-4 rounded">
            <img src={basicUser.avatar_url} width="80" className="rounded-full" />
            <h2>{basicUser.name || basicUser.login}</h2>
            <a href={basicUser.html_url} target="_blank">Profile</a>
          </div>
        )}

        {mode === "advanced" && results.map((u) => (
          <div key={u.id} className="border p-4 rounded flex gap-4">
            <img src={u.avatar_url} width="60" className="rounded-full" />
            <div>
              <p className="font-bold">{u.name || u.login}</p>
              <p>📍 {u.location || "Unknown"}</p>
              <p>📦 {u.public_repos} repos</p>
              <a href={u.html_url} target="_blank">Profile</a>
            </div>
          </div>
        ))}
      </div>

      {mode === "advanced" && results.length < totalCount && (
        <button onClick={() => runAdvanced(page + 1)} className="mt-4 w-full bg-slate-200 p-2 rounded">
          Load More
        </button>
      )}
    </div>
  );
}
