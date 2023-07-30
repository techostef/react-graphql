import { css } from "@emotion/css";
import { useRouter } from "next/router";
import theme from "../shared/config/theme";
import Loader from "../shared/components/Loader";
import Info from "./components/Info";
import { useAnimeDetails } from "./hooks/useAnimeDetails";

function Details() {
  const router = useRouter();
  const { loading } = useAnimeDetails(Number(router.query.id));

  return (
    <div>
      <h1 className={styles.title}>Anime Detail</h1>
        {loading && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
        {!loading && (
          <div className={styles.loader}>
            <Info />
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
};

export default Details;
