import { useState } from "react";

export default function RegistrationForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, message: "", type: "" });

  function validate(values) {
    const nextErrors = {};
    if (!values.username.trim()) nextErrors.username = "Username is required";
    if (!values.email.trim()) nextErrors.email = "Email is required";
    if (!values.password.trim()) nextErrors.password = "Password is required";
    return nextErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: false, message: "", type: "" });

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setStatus({ loading: true, message: "", type: "" });

      // Mock API call (simulate registration)
      // You can replace this with your own endpoint later.
      await new Promise((r) => setTimeout(r, 800));

      setStatus({ loading: false, message: "Registration successful ✅", type: "success" });
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setStatus({ loading: false, message: "Registration failed ❌", type: "error" });
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h2>Controlled Registration Form</h2>

      {status.message && (
        <p style={{ padding: 10, borderRadius: 6, background: status.type === "success" ? "#e9ffe9" : "#ffe9e9" }}>
          {status.message}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
            style={{ width: "100%", padding: 10 }}
          />
          {errors.username && <small style={{ color: "crimson" }}>{errors.username}</small>}
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            style={{ width: "100%", padding: 10 }}
          />
          {errors.email && <small style={{ color: "crimson" }}>{errors.email}</small>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            style={{ width: "100%", padding: 10 }}
          />
          {errors.password && <small style={{ color: "crimson" }}>{errors.password}</small>}
        </div>

        <button disabled={status.loading} style={{ padding: 10, cursor: "pointer" }}>
          {status.loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}