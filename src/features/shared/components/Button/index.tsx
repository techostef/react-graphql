import { css, cx } from "@emotion/css";
import React, { ButtonHTMLAttributes } from "react";
import theme from "../../config/theme";

interface IProps {
  children: React.ReactNode;
  variant?: 'danger' | 'default',
}

function Button({
  children,
  className,
  disabled,
  variant = 'default',
  type = "button",
  onClick,
}: IProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  function getVariant () {
    switch(variant) {
      case 'danger':
        return styles.danger;
      default:
        return undefined
    }
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={cx(className, styles.container, getVariant())}
    >
      {children}
    </button>
  );
}

const styles = {
  container: css({
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    cursor: "pointer",
    borderRadius: 4,
    border: `1px solid ${theme.color.graySmooth}`,
    height: 34,
    width: "fit-content",
    "&:active": {
      border: `1px solid ${theme.color.dark}`,
    },
  }),
  danger: css({
    background: theme.color.danger,
    color: theme.color.white
  })
};

export default Button;
