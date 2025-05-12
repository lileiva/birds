import { gql } from "@/__generated__/gql";
import { GetBirdQuery } from "@/__generated__/graphql";

export const BIRD_QUERY = gql(`
  query GetBird($id: ID!) {
    bird(id: $id) {
      id
      thumb_url
      image_url
      english_name
      latin_name
      notes {
        id
        comment
        timestamp
      }
    }
  }
`);

export type Bird = GetBirdQuery["bird"];
