import { css } from "@emotion/css";
import { IAnimeItem } from "../../types/anime";
import AnimeItem from "./AnimeItem";
import theme from "../../config/theme";

interface IProps {
  data?: IAnimeItem[];
  isRemoveAble?: boolean;
  onRemove?: (id: number) => void;
}

function AnimeList({ data, isRemoveAble, onRemove }: IProps) {
  if (!data) {
    return null;
  }
  
  return (
    <div className={styles.container}>
      {data.map((anime) => (
        <AnimeItem key={anime.id} {...anime} isRemoveAble={isRemoveAble} onClickRemove={onRemove} />
      ))}
    </div>
  );
}

const styles = {
  container: css({
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing.s,
  }),
};

export default AnimeList;
