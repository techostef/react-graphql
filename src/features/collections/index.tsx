import { css } from "@emotion/css";
import React, { useState } from "react";
import theme from "../shared/config/theme";
import Box from "../shared/components/Box";

import CollectionsList from "./components/CollectionsList";
import Button from "../shared/components/Button";
import ModalAddOrEditCollection from "./components/ModalAddOrEditCollection";
import { ICollection } from "../shared/types/collections";

function Home() {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [item, setItem] = useState<ICollection>();

  function handleOpenModalAdd() {
    setShowModalAdd(true);
  }

  function handleCloseModalAdd() {
    setShowModalAdd(false);
    setItem(undefined);
  }

  function handleClickEdit(item: ICollection) {
    setItem(item);
    setShowModalAdd(true);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Collections</h1>
      <Button onClick={handleOpenModalAdd} className={styles.button}>
        Add a Collection
      </Button>
      <Box>
        <CollectionsList onEdit={handleClickEdit} isEditAble isRemoveAble />
      </Box>
      <ModalAddOrEditCollection
        item={item}
        show={showModalAdd}
        onClose={handleCloseModalAdd}
      />
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
  }),
  pagination: css({
    display: "flex",
    marginTop: theme.spacing.s,
    justifyContent: "flex-end",
  }),
  button: css({
    marginBottom: theme.spacing.s,
  }),
  container: css({
    ".name": {
      color: theme.color.gray,
    },
    ".content-list": {
      maxHeight: 'unset'
    }
  }),
};

export default Home;
