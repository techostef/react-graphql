import { css, cx } from "@emotion/css";
import React, { PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import theme from "../../config/theme";

const NAME_COMPONENTS = ["ModalHeader", "ModalBody"];

interface IProps extends PropsWithChildren {
  onClose: () => void;
  show: boolean;
  width?: number | string;
}

const Modal = ({ children, ...props }: IProps) => {
  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  function RenderChildren() {
    const modalComponents: React.ReactNode[] = [];
    const otherComponents: React.ReactNode[] = [];
    React.Children.map(children, (child) => {
      // equal to (if (child == null || typeof child == 'string'))
      if (!React.isValidElement(child)) {
        otherComponents.push(child);
        return;
      }

      if (
        typeof child.type !== "string" &&
        NAME_COMPONENTS.includes(child.type.name)
      ) {
        modalComponents.push(child);
        return;
      }

      otherComponents.push(child);
    });
    return [...modalComponents, otherComponents].map((item) => item);
  }

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  if (!props.show) {
    return null;
  }

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className={cx(styles.modal, styles.active)} onClick={props.onClose}>
        <div
          className={styles.content}
          onClick={(e) => e.stopPropagation()}
          style={
            props.width
              ? {
                  width: props.width,
                }
              : undefined
          }
        >
          {RenderChildren()}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")!
  );
};

function ModalHeader({ children }: PropsWithChildren) {
  return (
    <div className={styles.header}>
      <h4 className={styles.title}>{children}</h4>
    </div>
  );
}

function ModalBody({ children }: PropsWithChildren) {
  return <div className={styles.body}>{children}</div>;
}

interface IPropsFooter extends PropsWithChildren {
  className?: string;
}

function ModalFooter({ children, className }: IPropsFooter) {
  return <div className={cx(styles.footer, className)}>{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

const styles = {
  modal: css({
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "all 0.3s ease-in-out",
  }),
  active: css({
    opacity: 1,
  }),
  content: css({
    width: "500px",
    backgroundColor: theme.color.white,
    transition: "all 0.3s ease-in-out",
  }),
  header: css({
    padding: theme.spacing.s,
  }),
  footer: css({
    padding: theme.spacing.s,
    display: "flex",
    justifyContent: "flex-end",
  }),
  body: css({
    padding: theme.spacing.s,
    borderTop: `1px solid ${theme.color.graySmooth}`,
    borderBottom: `1px solid ${theme.color.graySmooth}`,
  }),
  title: css({
    margin: 0,
  }),
};

export default Modal;
