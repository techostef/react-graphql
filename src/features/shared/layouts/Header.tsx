import { css, cx } from "@emotion/css";
import Link from "next/link";
import theme from "../config/theme";
import { UrlPage } from "../constants/Path";
import { useRouter } from "next/router";

function Header () {
  const { route } = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link className={cx(styles.item, route === UrlPage.home && styles.active)} href={UrlPage.home}>Home</Link>
        <Link className={cx(styles.item, route === UrlPage.collectionList && styles.active)} href={UrlPage.collectionList}>My Collections</Link>
      </div>
    </div>
  )
}

const styles = {
  container: css({
    width: '100%',
    background: theme.color.grayLight,
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.s,
    display: 'flex',
    justifyContent: 'center'
  }),
  content: css({
    display: 'flex',
    width: theme.width.desktop,
  }),
  item: css({
    marginRight: theme.spacing.s,
    display: 'block',
    height: '100%',
    padding: theme.spacing.xs
  }),
  active: css({
    background: theme.color.green,
    color: theme.color.grayLight
  })
}

export default Header;