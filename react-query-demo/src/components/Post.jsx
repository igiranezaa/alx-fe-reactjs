import { useParams, Link } from "react-router-dom";

export default function Post() {
  const { id } = useParams();

  return (
    <div>
      <h2>Post</h2>
      <p>
        Viewing post id: <strong>{id}</strong>
      </p>
      <Link to="/">Back Home</Link>
    </div>
  );
}