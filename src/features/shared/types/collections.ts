import { IAnimeItem } from './anime'

export interface ICollection {
  id: string,
  name: string;
  items: IAnimeItem[];
  coverImage?: string;
}