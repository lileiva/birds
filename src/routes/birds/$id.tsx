import { AddNoteMutation } from "@/__generated__/graphql";
import { AddNoteMutationVariables } from "@/__generated__/graphql";
import { BIRD_QUERY } from "@/graphql/bird";
import { ADD_NOTE_MUTATION } from "@/graphql/notes";
import { BirdView } from "@/views/birds/bird";
import { BirdLoadingView } from "@/views/birds/bird-loading";
import { useMutation, useQuery } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/birds/$id")({
  component: Bird,
});

function Bird() {
  const { id } = Route.useParams();
  const { data, loading, error } = useQuery(BIRD_QUERY, {
    variables: { id },
  });
  const addNoteMutation = useMutation<
    AddNoteMutation,
    AddNoteMutationVariables
  >(ADD_NOTE_MUTATION, {
    refetchQueries: [BIRD_QUERY],
  });

  if (loading) return <BirdLoadingView />;

  if (error) return <div>Error: {error.message}</div>;

  if (!data?.bird) return <div>Bird not found</div>;

  return <BirdView bird={data?.bird} addNoteMutation={addNoteMutation} />;
}
