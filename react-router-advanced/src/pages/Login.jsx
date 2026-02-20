import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/profile";

  function handleLogin() {
    login();
    navigate(from, { replace: true });
  }

  return (
    <div style={{ padding: 24, maxWidth: 520 }}>
      <h2>Login</h2>
      <p>This is a simple auth simulation.</p>

      {isAuthenticated ? (
        <p>You are already logged in.</p>
      ) : (
        <button onClick={handleLogin} style={{ padding: 10 }}>
          Click to Login
        </button>
      )}
    </div>
  );
}