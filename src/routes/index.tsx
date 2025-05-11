import { gql } from "@/__generated__/gql";
import { useQuery } from "@apollo/client";
import { createFileRoute, Link } from "@tanstack/react-router";

const GET_BIRDS = gql(`
  query GetBirds {
    birds {
      id
      english_name
      thumb_url
    }
  }
`);

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data, loading, error } = useQuery(GET_BIRDS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Birds</h1>
      {data?.birds.map((bird) => (
        <div key={bird.id}>
          <Link to="/birds/$id" params={{ id: bird.id }} className="bird-link">
            {bird.english_name}
          </Link>
        </div>
      ))}
    </div>
  );
}
