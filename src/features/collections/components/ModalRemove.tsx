import React, { useMemo } from 'react';
import { css } from "@emotion/css";

import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";
import theme from "../../shared/config/theme";
import { ICollection } from '../../shared/types/collections';

interface IProps {
  item?: ICollection;
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

function ModalRemove (props: IProps) {
  if (!props.item) {
    return;
  }
  return (
    <Modal {...props} width={520}>
      <Modal.Body>
        Are you sure to delete collection {props.item.name}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className={styles.buttonAdd} onClick={props.onSubmit}>
          Delete
        </Button>
        <Button onClick={props.onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const styles = {
  buttonAdd: css({
    marginRight: theme.spacing.s
  })
}

export default ModalRemove