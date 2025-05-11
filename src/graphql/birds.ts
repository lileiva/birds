import { gql } from "@/__generated__/gql";
import { GetBirdsQuery } from "@/__generated__/graphql";

export const BIRDS_QUERY = gql(`
  query GetBirds {
    birds {
      id
      thumb_url
      english_name
      latin_name
    }
  }
`);

export type Bird = GetBirdsQuery["birds"][number];

export type BirdsData = GetBirdsQuery;
