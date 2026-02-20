import { Link, Outlet } from "react-router-dom";

export default function Profile() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Profile (Protected)</h2>

      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="details">Profile Details</Link>
        <Link to="settings">Profile Settings</Link>
      </nav>

      <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <Outlet />
      </div>
    </div>
  );
}