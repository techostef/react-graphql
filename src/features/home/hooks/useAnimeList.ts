import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GET_ANIME_LIST } from '../query';

const PER_PAGE = 10;

export interface IDataAnimeList {
  Page: {
    __typename: string
    pageInfo: PageInfo
    media: Media[]
  }
}

interface PageInfo {
  __typename: string
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  hasNextPage: boolean
}

interface Media {
  __typename: string
  id: number
  title: Title
  coverImage: CoverImage
  description: string
  seasonYear: number
  status: string;
  episodes: number;
}

interface Title {
  __typename: string
  romaji: string
}

interface CoverImage {
  __typename: string
  medium: string
}


export function useAnimeList () {
  const [ page, setPage ] = useState(1);
  const { loading, error, data, refetch } = useQuery<IDataAnimeList>(QUERY_GET_ANIME_LIST,  {
    variables: {
      perPage: PER_PAGE,
      page,
    }
  });

  function onChangePage (page: number) {
    setPage(page);
    refetch({
      page,
      perPage: PER_PAGE
    })
  }

  return {
    loading, 
    error,
    data,
    onChangePage
  }
}