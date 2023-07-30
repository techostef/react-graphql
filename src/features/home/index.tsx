import { css } from "@emotion/css";
import { useAnimeList } from "./hooks/useAnimeList";
import AnimeList from "../shared/components/AnimeList";
import Pagination from "../shared/components/Pagination";
import { convertDataAnimeListToAnimeItems } from "./utils";
import theme from "../shared/config/theme";
import Box from "../shared/components/Box";
import Loader from "../shared/components/Loader";
import { MediaScreen } from "../shared/constants/MediaScreen";

function Home() {
  const { data, loading, onChangePage } = useAnimeList();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Anime List</h1>
      <Box>
        {loading && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
        {!loading && (
          <AnimeList data={convertDataAnimeListToAnimeItems(data?.Page)} />
        )}
      </Box>
      {!loading && data?.Page.pageInfo && (
        <div className={styles.pagination}>
          <Pagination onChangePage={onChangePage} {...data?.Page.pageInfo} />
        </div>
      )}
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
  container: css({
    [MediaScreen.tablet]: {
      padding: theme.spacing.s
    }
  })
};

export default Home;
