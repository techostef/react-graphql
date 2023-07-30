import { IAnimeItem } from "../../shared/types/anime";
import { IDataAnimeDetail } from "../hooks/useAnimeDetails";

export function convertDataAnimeItemToAnimeItem (item: IDataAnimeDetail['Media']): Required<IAnimeItem> {
  return {
    id: item.id,
    title: item.title.romaji,
    coverImage: item.coverImage.large,
    description: item.description,
    genres: item.genres,
    meanScore: item.meanScore,
    seasonYear: item.seasonYear,
    status: item.status,
    episodes: item.episodes
  };
}