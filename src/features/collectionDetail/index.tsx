import React, { useState } from "react";
import { css } from "@emotion/css";
import { toast } from 'react-toastify';

import { DefaultImageIcon } from "../shared/assets/DefaultImage";
import AnimeList from "../shared/components/AnimeList";
import { useCollectionDetails } from "./hooks/useCollectionDetails";
import theme from "../shared/config/theme";
import Box from "../shared/components/Box";
import ModalAddOrEditToCollection from "../collections/components/ModalAddOrEditCollection";
import { PencilIcon } from "../shared/assets/Pencil";
import ModalRemove from "./components/ModalRemove";
import { MediaScreen } from "../shared/constants/MediaScreen";

function CollectionDetails() {
  const { collection, updateName, removeAnimeOnCollection } = useCollectionDetails();
  const animeList = collection?.items ?? [];
  const [firstAnime] = animeList;
  const coverImage = firstAnime?.coverImage || "";

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<number>();

  function handleOpenModalAdd() {
    setShowModalAdd(true);
  }

  function handleCloseModalAdd() {
    setShowModalAdd(false);
  }

  function onSuccessSubmit(name: string) {
    updateName(name);
    handleCloseModalAdd();
  }

  function handleClickRemove(id: number) {
    console.log('click')
    setSelectedAnime(id);
    setShowRemove(true);
  }

  function onRemoveAnime() {
    if (selectedAnime) {
      removeAnimeOnCollection(selectedAnime);
      toast("Success remove", {
        type: "error",
      });
    }
    setShowRemove(false);
  }

  function handleCloseModalRemove() {
    setShowRemove(false);
  }

  return (
    <div>
      <h1 className={styles.title}>
        Collection {collection?.name}
        {<PencilIcon className={styles.edit} onClick={handleOpenModalAdd} />}
      </h1>
      {coverImage && <img className={styles.image} src={coverImage} />}
      {!coverImage && <DefaultImageIcon className={styles.image} />}
      <Box className={styles.box}>
        {animeList.length > 0 && <AnimeList isRemoveAble onRemove={handleClickRemove} data={animeList} />}
        {animeList.length === 0 && (
          <span className={styles.info}>Anime is empty</span>
        )}
      </Box>
      {collection && (
        <ModalAddOrEditToCollection
          item={collection}
          show={showModalAdd}
          onClose={handleCloseModalAdd}
          onSubmit={onSuccessSubmit}
        />
      )}
      <ModalRemove onSubmit={onRemoveAnime} onClose={handleCloseModalRemove} show={showRemove} />
    </div>
  );
}

const styles = {
  loader: css({
    width: "100%",
    display: "flex",
    justifyContent: "center",
  }),
  title: css({
    color: theme.color.grayLight,
    [MediaScreen.tablet]: {
      marginLeft: theme.spacing.s
    },
    [MediaScreen.mobile]: {
      marginLeft: theme.spacing.s
    }
  }),
  image: css({
    width: 150,
    height: 150,
    [MediaScreen.tablet]: {
      marginLeft: theme.spacing.s
    },
    [MediaScreen.mobile]: {
      marginLeft: theme.spacing.s
    }
  }),
  box: css({
    marginTop: theme.spacing.s,
  }),
  info: css({
    color: theme.color.gray,
  }),
  edit: css({
    marginLeft: theme.spacing.s,
    cursor: 'pointer',
    path: {
      fill: theme.color.green,
    },
  }),
};

export default CollectionDetails;
