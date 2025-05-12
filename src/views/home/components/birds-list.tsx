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

  const isVisible = (birdName: string) => {
    if (!filter) return true;
    return birdName.toLowerCase().includes(filter.toLowerCase());
  };

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
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ))
          : data?.birds.map((bird) => (
              <BirdCard
                key={bird.id}
                values={{
                  id: bird.id,
                  thumbnailUrl: bird.thumb_url,
                  englishName: bird.english_name,
                  latinName: bird.latin_name,
                  isVisible: isVisible(bird.english_name),
                }}
              />
            ))}
      </div>
    </div>
  );
};
