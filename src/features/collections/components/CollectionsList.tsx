import React, { useState } from "react";
import { useRouter } from "next/router";
import { css, cx } from "@emotion/css";

import { useCollections } from "../contexts/CollectionsContext";
import CollectionsItem from "./CollectionsItem";
import { ICollection } from "../../shared/types/collections";
import theme from "../../shared/config/theme";
import { checkAnimeBookedOnCollection } from "../utils";
import { useAnimeItem } from "../../shared/contexts/useAnimeItem";
import { UrlPage } from "../../shared/constants/Path";
import ModalRemove from "./ModalRemove";
import { toast } from "react-toastify";

interface IProps {
  title?: string;
  isSelection?: boolean;
  isEditAble?: boolean;
  isRemoveAble?: boolean;
  isMulti?: boolean;
  onEdit?: (item: ICollection) => void;
}

function CollectionsList({
  title,
  isSelection,
  isEditAble,
  isRemoveAble,
  onEdit,
  isMulti = true,
}: IProps) {
  const { lists, selectedItems, handleSelectItems, handleRemoveCollection } =
    useCollections();
  const [showRemove, setShowRemove] = useState(false);
  const [selectedItemRemove, setSelectedItemRemove] = useState<ICollection>();
  const { anime } = useAnimeItem();
  const router = useRouter();

  function handleClick(item: ICollection) {
    if (isSelection) {
      handleSelectItems(item, isMulti);
      return;
    }

    router.push(UrlPage.collectionDetails.replace("{id}", item.id));
  }

  function getInfo(item: ICollection) {
    if (!isSelection) {
      return undefined;
    }

    if (anime && checkAnimeBookedOnCollection(anime, item.items)) {
      return <div className={styles.info}>Booked</div>;
    }

    return <div className={styles.info}>Not Booked</div>;
  }

  function handleClickRemove(item: ICollection) {
    setSelectedItemRemove(item);
    setShowRemove(true);
  }

  function onRemoveCollection() {
    if (selectedItemRemove) {
      handleRemoveCollection(selectedItemRemove);
      toast("Success remove", {
        type: "error",
      });
    }
    setShowRemove(false);
  }

  function handleCloseModalRemove() {
    setShowRemove(false);
  }

  if (!lists.length) {
    return <div className={styles.empty}>Collections is empty</div>;
  }

  return (
    <div>
      {title && <div className={styles.title}>{title}</div>}
      <div className={cx(styles.content, "content-list")}>
        {lists.map((item) => (
          <CollectionsItem
            key={item.name}
            isSelected={!!selectedItems[item.name]}
            {...item}
            onClick={handleClick}
            onClickRemove={handleClickRemove}
            info={getInfo(item)}
            isRemoveAble={isRemoveAble}
            isEditAble={isEditAble}
            onClickEdit={onEdit}
          />
        ))}
      </div>
      <ModalRemove
        item={selectedItemRemove}
        show={showRemove}
        onClose={handleCloseModalRemove}
        onSubmit={onRemoveCollection}
      />
    </div>
  );
}

const styles = {
  title: css({
    fontSize: 16,
    fontWeight: 600,
    marginBottom: theme.spacing.s,
  }),
  content: css({
    display: "flex",
    flexWrap: "wrap",
    maxHeight: 400,
    overflowY: "auto",
    gap: theme.spacing.xxs,
  }),
  info: css({
    width: "100%",
    textAlign: "end",
    marginRight: theme.spacing.s,
  }),
  empty: css({
    color: theme.color.gray
  })
};

export default CollectionsList;
