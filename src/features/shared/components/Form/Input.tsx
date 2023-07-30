import { css, cx } from "@emotion/css";
import React, { InputHTMLAttributes } from "react";
import theme from "../../config/theme";

interface IProps {
  name?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  error?: boolean;
  errorMessage?: React.ReactNode;
  placeholder?: string;
  className?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>,
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputText({
  label,
  name,
  value,
  placeholder,
  error,
  errorMessage,
  className,
  inputProps = {},
  onChange,
}: IProps) {
  
  return (
    <div className={cx(styles.container, className)}>
      <label>{label}</label>
      <input
        name={name}
        {...inputProps}
        placeholder={placeholder}
        className={cx(styles.input, inputProps.className, error && styles.inputError)}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className={styles.error}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
  }),
  input: css({
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xxs,
    borderRadius: 4,
    padding: theme.spacing.xs,
    border: `1px solid ${theme.color.graySmooth}`,
    "&:focus": {
      outline: `1px solid ${theme.color.gray}`,
    },
  }),
  inputError: css({
    border: `1px solid ${theme.color.danger}`,
    "&:focus": {
      outline: `1px solid ${theme.color.danger}`,
    },
  }),
  error: css({
    color: theme.color.danger,
    fontSize: 12
  })
};

export default InputText;
