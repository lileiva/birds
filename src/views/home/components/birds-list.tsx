import { FC } from "react";
import { useQuery } from "@apollo/client";
import { BIRDS_QUERY, BirdsData } from "../../../graphql/birds";
import { BirdCard } from "./bird-card";
import { Skeleton } from "@/components/ui/skeleton";

interface BirdsListProps {
  filter?: string;
}

export const BirdsList: FC<BirdsListProps> = ({ filter }) => {
  const { data, loading, error } = useQuery<BirdsData>(BIRDS_QUERY);

  const filteredBirds = data?.birds.filter((bird) => {
    if (!filter) return true;
    return bird.english_name.toLowerCase().includes(filter.toLowerCase());
  });

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading birds: {error.message}
      </div>
    );
  }

  return (
    <div className="">
      <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap gap-6">
        {loading
          ? // Loading skeletons
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ))
          : // Actual bird cards
            filteredBirds?.map((bird) => (
              <BirdCard
                key={bird.id}
                values={{
                  id: bird.id,
                  thumbnailUrl: bird.thumb_url,
                  englishName: bird.english_name,
                  latinName: bird.latin_name,
                }}
              />
            ))}
      </div>
    </div>
  );
};
