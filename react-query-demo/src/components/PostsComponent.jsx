import { useQuery } from "react-query";
import { useState } from "react";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function PostsComponent() {
  const [visible, setVisible] = useState(true);

  // toggle mounting to demonstrate cache behavior
  function toggleVisible() {
    setVisible((v) => !v);
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2>React Query Demo (Posts)</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button onClick={toggleVisible} style={{ padding: 10 }}>
          {visible ? "Unmount PostsComponent" : "Mount PostsComponent"}
        </button>
        <p style={{ margin: 0, alignSelf: "center" }}>
          Tip: unmount + mount quickly → data should come from cache (no refetch if still fresh).
        </p>
      </div>

      {visible && <PostsInner />}
    </div>
  );
}

function PostsInner() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery(["posts"], fetchPosts, {
    staleTime: 30_000, // 30s fresh window: helps show caching
    cacheTime: 5 * 60_000, // keep cache 5 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p style={{ color: "crimson" }}>Error: {error.message}</p>;

  return (
    <div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
        <button onClick={() => refetch()} style={{ padding: 10 }}>
          Refetch posts
        </button>
        <span>{isFetching ? "Fetching..." : "Idle"}</span>
        <small style={{ marginLeft: "auto" }}>
          Last updated: {new Date(dataUpdatedAt).toLocaleTimeString()}
        </small>
      </div>

      <ul style={{ display: "grid", gap: 10, paddingLeft: 18 }}>
        {data.slice(0, 15).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p style={{ margin: "6px 0 0" }}>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}