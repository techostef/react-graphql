import { IPagination } from "./types";
import { usePagination } from "./hooks/usePagination";
import { DOTS } from "./constants";
import { css, cx } from "@emotion/css";
import theme from "../../config/theme";
import { MediaScreen } from "../../constants/MediaScreen";

interface IProps extends IPagination {
  className?: string;
  onChangePage: (page: number) => void;
}

function Pagination({ onChangePage, className, ...props }: IProps) {
  const { paginationRange } = usePagination(props);
  const { currentPage } = props;

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={cx(styles.container, className)}>
      {/* Left navigation arrow */}
      {props.currentPage !== 1 && (
        <div
          className={cx(styles.item, styles.arrow)}
          onClick={() => onChangePage(currentPage - 1)}
        >
          {"<"}
        </div>
      )}
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <div className={styles.item} key={pageNumber}>
              &#8230;
            </div>
          );
        }

        // Render our Page Pills
        return (
          <div
            onClick={() => onChangePage(pageNumber)}
            className={cx(
              styles.item,
              props.currentPage === pageNumber && styles.selected
            )}
            key={pageNumber}
          >
            {pageNumber}
          </div>
        );
      })}
      {/*  Right Navigation arrow */}
      {props.currentPage !== lastPage && (
        <div
          className={cx(styles.item, styles.arrow)}
          onClick={() => onChangePage(currentPage + 1)}
        >
          {">"}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: css({
    display: "flex",
  }),
  item: css({
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    textAlign: "center",
    color: theme.color.darkLight,
    background: theme.color.grayLight,
    borderRadius: 5,
    marginRight: theme.spacing.xs,
    "&:hover": {
      backgroundColor: theme.color.gray,
    },
    [MediaScreen.mobile]: {
      width: 30,
      height: 30,
      fontSize: 10,
      marginRight: theme.spacing.xxs,
    }
  }),
  selected: css({
    cursor: "not-allowed",
    color: theme.color.gray,
    backgroundColor: theme.color.darkLight,
    "&:hover": {
      cursor: "not-allowed",
      color: theme.color.gray,
      backgroundColor: theme.color.darkLight,
    },
  }),
  arrow: css({
    fontWeight: 800,
  }),
};

export default Pagination;
