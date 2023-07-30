import { gql } from '@apollo/client';

export const QUERY_GET_ANIME_DETAIL = gql`
  query ($id: Int) {
    Media (id: $id, type: ANIME) {
      id
      title {
        romaji
      }
      coverImage {
        large
      }
      description
      genres
      meanScore
      seasonYear
      status
      episodes
    }
  }
`;