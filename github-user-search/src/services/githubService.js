import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function fetchUserData(username) {
  const res = await api.get(`/users/${username}`);
  return res.data;
}

export async function searchUsersAdvanced({ term, location, minRepos, page = 1 }) {
  const parts = [];
  if (term) parts.push(term);
  if (location) parts.push(`location:${location}`);
  if (minRepos) parts.push(`repos:>=${minRepos}`);

  const q = parts.join(" ");
  const res = await api.get(`/search/users`, {
    params: { q, page, per_page: 10 },
  });

  return res.data;
}

export async function fetchUserDetails(url) {
  const res = await axios.get(url);
  return res.data;
}
