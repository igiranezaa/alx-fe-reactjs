import { useParams, Link } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();

  return (
    <div>
      <h2>Blog Post</h2>
      <p>
        Viewing blog post id: <strong>{id}</strong>
      </p>
      <Link to="/">Back Home</Link>
    </div>
  );
}