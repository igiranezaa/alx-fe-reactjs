import { useState } from "react";

export function useAuth() {
  const [isAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  return { isAuthenticated };
}