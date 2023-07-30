import React from "react";
import { useRouter } from "next/router";
import { DefaultImageIcon } from "../../shared/assets/DefaultImage";
import { TrashbinIcon } from "../../shared/assets/Trashbin";
import { CheckedIcon } from "../../shared/assets/Checked";
import { PencilIcon } from "../../shared/assets/Pencil";
import { css, cx } from "@emotion/css";
import { ICollection } from "../../shared/types/collections";
import theme from "../../shared/config/theme";
import { UrlPage } from "../../shared/constants/Path";

interface IProps extends ICollection {
  onClick: (item: ICollection) => void;
  onClickRemove?: (item: ICollection) => void;
  onClickEdit?: (item: ICollection) => void;
  isSelected?: boolean;
  isEditAble?: boolean;
  isRemoveAble?: boolean;
  info?: React.ReactNode;
}

function CollectionsItem({
  onClick,
  onClickRemove,
  onClickEdit,
  isSelected,
  info,
  isEditAble,
  isRemoveAble,
  ...item
}: IProps) {
  const { coverImage, name } = item;
  const router = useRouter();

  const showAction = isEditAble || isRemoveAble;

  function clickName() {
    router.push(UrlPage.collectionDetails.replace("{name}", item.name));
  }

  return (
    <div
      className={cx(styles.container, isSelected && styles.containerSelected)}
    >
      {coverImage && (
        <img
          onClick={() => onClick(item)}
          className={styles.image}
          src={coverImage}
        />
      )}
      {!coverImage && (
        <DefaultImageIcon
          onClick={() => onClick(item)}
          className={styles.image}
        />
      )}
      <div className={styles.containerName} onClick={clickName}>
        <div className={cx(styles.name, "name")}>{name}</div>
      </div>
      {showAction && (
        <div className={styles.actions}>
          {isEditAble && (
            <PencilIcon
              className={styles.edit}
              onClick={() => onClickEdit?.(item)}
            />
          )}
          {isRemoveAble && (
            <TrashbinIcon
              className={styles.remove}
              onClick={() => onClickRemove?.(item)}
            />
          )}
        </div>
      )}
      {isSelected && <CheckedIcon className={styles.checked} />}
      {info}
    </div>
  );
}

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "fit-content",
    position: "relative",
    maxWidth: 150,
    cursor: "pointer",
  }),
  containerSelected: css({}),
  name: css({
    width: "calc(100% - 40px)",
    marginLeft: theme.spacing.s,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  image: css({
    width: 150,
    height: 150,
  }),
  checked: css({
    position: "absolute",
    top: 155,
    right: theme.spacing.s,
  }),
  containerName: css({
    width: "100%",
    display: "flex",
    cursor: "pointer",
  }),
  remove: css({
    path: {
      fill: theme.color.danger,
    },
  }),
  edit: css({
    path: {
      fill: theme.color.green,
    },
  }),
  actions: css({
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    background: theme.color.gray,
    borderRadius: 4,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    gap: theme.spacing.xxs,
    padding: theme.spacing.xxs,
  }),
};

export default CollectionsItem;
