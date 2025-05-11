import { useQuery } from "@apollo/client";
import { gql } from "./__generated__/gql";

const GET_BIRDS = gql(`
  query GetBirds {
    birds {
      id
      english_name
      thumb_url
    }
  }
`);

const App = () => {
  const { data, loading, error } = useQuery(GET_BIRDS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Birds</h1>
      {data?.birds.map((bird) => (
        <div key={bird.id}>{bird.english_name}</div>
      ))}
    </div>
  );
};

export default App;
