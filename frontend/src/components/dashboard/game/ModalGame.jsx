import { useRef } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import Button from "../../common/Button";
import Input from "../../common/Input";

import * as Games from "../../../services/games";

import TOAST_DEFAULT_CONFIG from "../../../settings/toastify.json";

import styles from "../Table.module.css";

export default function ModalGame({ isOpened, openModal, refetchData }) {
  const inputRef = useRef();
  const fileRef = useRef();

  const handleClose = () => {
    inputRef.current.value = "";
    openModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gameName = inputRef.current.value.trim().toLowerCase();
    // upload file to backend public folder
    // use the FormData constructor to create a new FormData object (instance) to convert the image file into a bunch of data and send it through the network
    const formData = new FormData();
    formData.append("game_thumbnail", fileRef.current.files[0]);
    try {
      const {
        data: { url_file: gameThumbUrl },
      } = await Games.addThumbnail(formData);

      const response = await Games.add({
        name: gameName,
        thumbnail: gameThumbUrl,
      });
      if (response?.status === 201)
        toast.success("Game successfully added!", TOAST_DEFAULT_CONFIG);
      // reset inputs
      inputRef.current.value = "";
      fileRef.current.value = "";
      // close modal
      openModal(false);
      // raise flag to refetch data from DB and update table view
      refetchData((prev) => !prev);
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
      title="Add a new game"
      onCancel={handleClose}
      onOk={handleSubmit}
      footer={null}
      afterOpenChange={() => {
        inputRef.current.focus();
      }}
    >
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <Input
          htmlFor="title"
          title="Game Name"
          type="text"
          className={`${styles.input__style}`}
          placeholder="Type game name..."
          required
          ref={inputRef}
        />
        <Input
          title="Image Upload"
          tooltip="Valid file extensions are: .jpg, .jpeg, .png, .webp"
          type="file"
          accept=".jpg, .jpeg, .png, .webp"
          className="file:hover:primaryLightest file:cursor-pointer file:rounded-md file:border-none file:bg-primary file:p-3 file:text-neutralLight"
          required
          ref={fileRef}
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

ModalGame.propTypes = {
  isOpened: PropTypes.bool,
  openModal: PropTypes.func,
  refetchData: PropTypes.func,
};

ModalGame.defaultProps = {
  isOpened: null,
  openModal: null,
  refetchData: null,
};
