import { css, cx } from "@emotion/css";
import theme from "../../config/theme";

interface IProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

function Box ({ children, className }: IProps) {
  return (
    <div className={cx(styles.content, className)}>
      {children}
    </div>
  )
}

const styles = {
  content: css({
    width: '100%',
    padding: theme.spacing.s,
    background: theme.color.darkLight,
    borderRadius: 4,
  })
}

export default Box;