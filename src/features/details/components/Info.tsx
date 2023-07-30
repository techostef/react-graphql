import { css } from "@emotion/css";
import { toast } from "react-toastify";
import { useState, useMemo } from "react";

import theme from "../../shared/config/theme";
import Box from "../../shared/components/Box";
import { safeHtml } from "../../shared/utils";
import { BookmarkIcon } from "../../shared/assets/Bookmark";
import ModalAddToCollection from "./ModalAnimeToCollection";
import { useCollections } from "../../collections/contexts/CollectionsContext";
import { useAnimeItem } from "../../shared/contexts/useAnimeItem";
import { MediaScreen } from "../../shared/constants/MediaScreen";

function Info() {
  const { anime } = useAnimeItem();

  const [show, setShow] = useState(false);
  const {
    selectedItems,
    resetSelection,
    isAnimeInCollections,
    addAnimeToCollections,
  } = useCollections();

  function onOpen() {
    setShow(true);
  }

  function onClose() {
    resetSelection();
    setShow(false);
  }

  function onAddCollection() {
    if (!anime) {
      return;
    }

    addAnimeToCollections(anime);
    toast("Success add to collections", {
      type: "success",
    });
    onClose();
  }

  const disabledSubmit = useMemo(() => {
    const length = Object.keys(selectedItems).length;
    return length === 0;
  }, [JSON.stringify(selectedItems)]);

  if (!anime) {
    return null;
  }

  const {
    title,
    coverImage,
    seasonYear,
    status,
    episodes,
    genres,
    meanScore,
    description,
  } = anime;

  return (
    <div className={styles.container}>
      <div>
        <img
          className={styles.image}
          src={coverImage}
          alt="Picture of the author"
        />
        <div className={styles.score}>Rate: {meanScore / 10}</div>
      </div>
      <Box className={styles.box}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.bookmark}>
            <BookmarkIcon
              className={String(isAnimeInCollections(anime) && styles.booked)}
              onClick={onOpen}
            />
          </div>
          <div className={styles.text}>
            <span className={styles.label}>Year</span>: {seasonYear}
          </div>
          <div className={styles.text}>
            <span className={styles.label}>Status</span>: {status}
          </div>
          <div className={styles.text}>
            <span className={styles.label}>Episode</span>: {episodes}
          </div>
          <div className={styles.text}>
            <span className={styles.label}>Genres</span>: {genres.join(", ")}
          </div>
          <div className={styles.text}>{safeHtml(description)}</div>
        </div>
      </Box>
      <ModalAddToCollection
        disabledSubmit={disabledSubmit}
        show={show}
        onClose={onClose}
        onSubmit={onAddCollection}
      />
    </div>
  );
}

const styles = {
  container: css({
    width: "100%",
    display: "flex",
    [MediaScreen.tablet]: {
      marginLeft: theme.spacing.l,
      marginRight: theme.spacing.l,
    },
    [MediaScreen.mobile]: {
      flexDirection: 'column',
      marginLeft: theme.spacing.l,
      marginRight: theme.spacing.l,
    },
  }),
  box: css({
    marginLeft: theme.spacing.s,
    [MediaScreen.mobile]: {
      marginTop: theme.spacing.s,
      marginLeft: 0,
    },
  }),
  image: css({
    width: 200,
    height: 300,
    borderRadius: 4,
    [MediaScreen.mobile]: {
      width: '100%'
    },
  }),
  score: css({
    width: "100%",
    padding: theme.spacing.s,
    background: theme.color.grayLight,
    color: theme.color.dark,
    marginTop: theme.spacing.s,
    borderRadius: 4,
  }),
  title: css({
    fontSize: 18,
    fontWeight: 600,
    color: theme.color.grayLight,
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.m,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  text: css({
    color: theme.color.gray,
    marginBottom: theme.spacing.xxs,
  }),
  label: css({
    color: theme.color.grayLight,
  }),
  content: css({
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing.s,
    overflowX: "hidden",
    position: "relative",
  }),
  bookmark: css({
    position: "absolute",
    top: theme.spacing.l,
    right: theme.spacing.s,
    cursor: "pointer",
  }),
  booked: css({
    path: {
      fill: theme.color.green,
    },
  }),
};

export default Info;
