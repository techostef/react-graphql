import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useAnimeItem } from "../../shared/contexts/useAnimeItem";
import { QUERY_GET_ANIME_DETAIL } from '../query';
import { convertDataAnimeItemToAnimeItem } from '../utils';

export interface IDataAnimeDetail {
  Media: Media
}

interface Media {
  id: number
  title: Title
  coverImage: CoverImage
  description: string
  genres: string[]
  meanScore: number
  seasonYear: number
  status: string
  episodes: number
  __typename: string
}

interface Title {
  romaji: string
  __typename: string
}

interface CoverImage {
  large: string
  __typename: string
}


export function useAnimeDetails (id?: number) {
  const { loading, error, data } = useQuery<IDataAnimeDetail>(QUERY_GET_ANIME_DETAIL,  {
    variables: {
      id,
    }
  });

  const { setAnime } = useAnimeItem();
  
  useEffect(() => {
    if (data) {
      setAnime(convertDataAnimeItemToAnimeItem(data.Media))
    }
  }, [JSON.stringify(data)])


  return {
    loading, 
    error,
  }
}