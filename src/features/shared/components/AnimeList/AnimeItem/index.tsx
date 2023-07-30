import { css } from "@emotion/css";
import { TrashbinIcon } from "../../../../shared/assets/Trashbin";
import { IAnimeItem } from "../../../types/anime";
import theme from "../../../config/theme";
import { useRouter } from "next/router";
import { UrlPage } from "../../../constants/Path";
import { MediaScreen } from "../../../constants/MediaScreen";

interface IProps extends IAnimeItem {
  isRemoveAble?: boolean;
  onClickRemove?: (id: number) => void;
}

function AnimeItem({
  title,
  coverImage,
  id,
  isRemoveAble,
  onClickRemove,
}: IProps) {
  const router = useRouter();
  function onClick() {
    router.push(UrlPage.detail.replace("{id}", String(id)));
  }
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={coverImage}
        alt="Picture of the author"
        onClick={onClick}
      />
      <div className={styles.content} onClick={onClick}>
        <div className={styles.title}>{title}</div>
      </div>
      {isRemoveAble && (
        <TrashbinIcon
          className={styles.remove}
          onClick={() => onClickRemove?.(id)}
        />
      )}
    </div>
  );
}

const styles = {
  container: css({
    width: 155,
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    position: "relative",
    [MediaScreen.mobile]: {
      width: "fit-content",
    },
  }),
  image: css({
    width: 150,
    minWidth: 150,
    height: 215,
  }),
  label: css({
    color: theme.color.grayLight,
  }),
  title: css({
    fontSize: 18,
    width: 150,
    color: theme.color.grayLight,
    marginTop: theme.spacing.xs,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  content: css({
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing.s,
    overflowX: "hidden",
  }),
  remove: css({
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.s,
    path: {
      fill: theme.color.danger,
    },
  }),
};

export default AnimeItem;
