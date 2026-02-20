import { useParams, Link } from "react-router-dom";

export default function Post() {
  const { id } = useParams();

  return (
    <div style={{ padding: 24 }}>
      <h2>Dynamic Post</h2>
      <p>
        You are viewing post id: <strong>{id}</strong>
      </p>
      <Link to="/">Back Home</Link>
    </div>
  );
}