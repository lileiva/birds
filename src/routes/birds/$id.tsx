import { gql } from "@/__generated__/gql";
import { useQuery } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";

const GET_BIRD = gql(`
  query GetBird($id: ID!) {
    bird(id: $id) {
      id
      english_name
      thumb_url
    }
  }
`);

export const Route = createFileRoute("/birds/$id")({
  component: BirdDetail,
});

function BirdDetail() {
  const { id } = Route.useParams();
  const { data, loading, error } = useQuery(GET_BIRD, {
    variables: { id },
    fetchPolicy: "cache-first",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.bird) return <div>Bird not found</div>;

  return (
    <div>
      <h1>{data.bird.english_name}</h1>
      {data.bird.thumb_url && (
        <img
          src={data.bird.thumb_url}
          alt={data.bird.english_name}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
      <p>
        <em>{data.bird.english_name}</em>
      </p>
    </div>
  );
}
