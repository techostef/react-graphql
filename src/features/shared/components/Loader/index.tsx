import { css } from "@emotion/css";
import theme from "../../config/theme";

function Loader () {
  return (
    <div data-testid="loader" className={styles.loader} />
  )
}

const styles = {
  loader: css({
    border: `4px solid ${theme.color.grayLight}`,
    borderRadius: '50%',
    borderTop: `4px solid ${theme.color.dark}`,
    width: 60,
    height: 60,
    animation: 'spin 1s linear infinite',
    
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    }
  })
}

export default Loader;