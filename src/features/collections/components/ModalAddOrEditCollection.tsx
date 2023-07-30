import React from 'react';

import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";
import FormAddCollection from "./FormCollection";
import { ICollection } from "../../shared/types/collections";

interface IProps {
  item?: ICollection;
  show: boolean;
  onClose: () => void;
  onSubmit?: (name: string) => void;
}

function ModalAddOrEditToCollection ({ item, onSubmit, ...propsModal}: IProps) {
  const isAdded = !!item;
  return (
    <Modal {...propsModal} width={520}>
      <Modal.Header>
        {isAdded ? 'Edit' : 'Add'} collections
      </Modal.Header>
      <Modal.Body>
        <FormAddCollection item={item} onSuccessSubmit={onSubmit ??propsModal.onClose} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={propsModal.onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalAddOrEditToCollection