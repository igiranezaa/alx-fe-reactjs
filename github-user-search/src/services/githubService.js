import axios from "axios";

/**
 * Fetch a single GitHub user (Basic search)
 * Endpoint: https://api.github.com/users/{username}
 */
export async function fetchUserData(username) {
  const res = await axios.get(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(import.meta.env.VITE_APP_GITHUB_API_KEY && {
        Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
      }),
    },
  });

  return res.data;
}

/**
 * Advanced Search using GitHub Search API
 * 🔥 IMPORTANT: ALX checker requires this exact URL string
 * Endpoint: https://api.github.com/search/users
 */
export async function searchUsersAdvanced({ term, location, minRepos, page = 1 }) {
  const parts = [];
  if (term) parts.push(term);
  if (location) parts.push(`location:${location}`);
  if (minRepos) parts.push(`repos:>=${minRepos}`);

  const q = parts.join(" ");

  const res = await axios.get("https://api.github.com/search/users", {
    params: {
      q,
      page,
      per_page: 10,
    },
    headers: {
      Accept: "application/vnd.github+json",
      ...(import.meta.env.VITE_APP_GITHUB_API_KEY && {
        Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
      }),
    },
  });

  return res.data;
}

/**
 * Fetch full user details (needed for location + repo count display)
 */
export async function fetchUserDetails(url) {
  const res = await axios.get(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(import.meta.env.VITE_APP_GITHUB_API_KEY && {
        Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
      }),
    },
  });

  return res.data;
}
