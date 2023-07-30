import { gql } from '@apollo/client';

export const QUERY_GET_ANIME_LIST = gql`
  query ($id: Int, $page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media (id: $id, type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          medium
        }
        seasonYear
        status
        episodes
      }
    }
  }
`;