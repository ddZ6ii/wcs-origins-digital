import { Modal } from "antd";
import { useRef } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import Button from "../../common/Button";
import Input from "../../common/Input";

import * as Languages from "../../../services/languages";

import TOAST_DEFAULT_CONFIG from "../../../settings/toastify.json";

import styles from "../Table.module.css";

export default function ModalLanguage({ isOpened, openModal, refetchData }) {
  const inputRef = useRef();

  const handleClose = () => openModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = inputRef.current.value.trim().toLowerCase();
      const response = await Languages.add({ name });

      if (response?.status === 201) {
        toast.success("Language successfully added!", TOAST_DEFAULT_CONFIG);
        refetchData((prev) => !prev);
        openModal(false);
      }
    } catch (err) {
      console.error(err);
      const { response } = err;
      const notification =
        response.status === 409 ? response.data : response.statusText;
      toast.error(notification, TOAST_DEFAULT_CONFIG);
    }
  };

  return (
    <Modal
      centered
      open={isOpened}
      title="Add a new language"
      onCancel={handleClose}
      onOk={handleSubmit}
      footer={null}
      afterOpenChange={() => {
        inputRef.current.focus();
      }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          htmlFor="title"
          title="Name"
          type="text"
          className={`${styles.input__style}`}
          placeholder="Type language name..."
          required
          ref={inputRef}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={handleClose}
            customCSS={`${styles.btn_modal__style} ring-1 ring-inset ring-neutral text-neutralDark hover:bg-neutralDark`}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            customCSS={`${styles.btn_modal__style} ml-2 bg-primaryLight text-neutralLightest`}
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}

ModalLanguage.propTypes = {
  isOpened: PropTypes.bool,
  openModal: PropTypes.func,
  refetchData: PropTypes.func,
};

ModalLanguage.defaultProps = {
  isOpened: null,
  openModal: null,
  refetchData: null,
};
