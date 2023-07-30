import { css } from "@emotion/css";

import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";
import FormAddCollection from "../../collections/components/FormCollection";
import CollectionsList from "../../collections/components/CollectionsList";
import theme from "../../shared/config/theme";

interface IProps {
  show: boolean;
  disabledSubmit: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

function ModalAnimeToCollection ({ disabledSubmit, onSubmit, ...props}: IProps) {
  return (
    <Modal {...props} width={520}>
      <Modal.Header>
        Add anime to collections
      </Modal.Header>
      <Modal.Body>
        <FormAddCollection />
        <CollectionsList title="Please select to add to collections" isSelection isMulti={false} />
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={disabledSubmit} className={styles.buttonAdd} onClick={onSubmit}>
          Add to Collection
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

export default ModalAnimeToCollection