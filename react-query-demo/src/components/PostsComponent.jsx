import { useQuery } from "react-query";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function PostsComponent() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery(
    "posts",
    fetchPosts,
    {
      keepPreviousData: true,      // REQUIRED
      cacheTime: 1000 * 60 * 5,    // REQUIRED (5 minutes)
      staleTime: 1000 * 10,        // optional: 10 seconds
      refetchOnWindowFocus: false, // REQUIRED
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>

      <button onClick={() => refetch()}>Refetch Posts</button>

      {isFetching && <p>Updating...</p>}

      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}