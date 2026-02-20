import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h2>Home</h2>

      <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile (Protected)</Link>
        <Link to="/posts/1">Dynamic Post 1</Link>
        <Link to="/posts/7">Dynamic Post 7</Link>
        <Link to="/login">Login</Link>
      </nav>

      <div style={{ marginTop: 16 }}>
        <p>Status: {isAuthenticated ? "Authenticated ✅" : "Not authenticated ❌"}</p>
        {isAuthenticated && (
          <button onClick={logout} style={{ padding: 10 }}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}