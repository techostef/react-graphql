import { IAnimeItem } from "../../shared/types/anime";
import { IDataAnimeList } from "../hooks/useAnimeList";

export function convertDataAnimeListToAnimeItems (data?: IDataAnimeList['Page']): IAnimeItem[] {
  let list: IAnimeItem[] = [];
  if (data?.media) {
    list = data.media.map((item) => ({
      id: item.id,
      title: item.title.romaji,
      coverImage: item.coverImage.medium,
      seasonYear: item.seasonYear,
      status: item.status,
      episodes: item.episodes,
      genres: item.genres,
      meanScore: item.meanScore,
    }))
  }

  return list;
}