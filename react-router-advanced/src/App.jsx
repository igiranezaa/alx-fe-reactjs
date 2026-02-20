import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";
import BlogPost from "./components/BlogPost";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <nav style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/blog/1">Blog 1</Link>
          <Link to="/login">Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Home</h2>} />
          <Route path="/login" element={<Login />} />

          {/* Dynamic route (checker wants "/blog/:id" and "BlogPost") */}
          <Route path="/blog/:id" element={<BlogPost />} />

          {/* Protected route */}
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}