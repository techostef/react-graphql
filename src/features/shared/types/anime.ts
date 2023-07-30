export interface IAnimeItem {
  id: number;
  title: string;
  coverImage: string;
  description?: string;
  genres: string[];
  meanScore: number;
  seasonYear: number;
  status: string;
  episodes: number;
}