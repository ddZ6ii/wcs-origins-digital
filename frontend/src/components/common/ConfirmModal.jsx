import { Modal } from "antd";
import PropTypes from "prop-types";

import styles from "../dashboard/Table.module.css";

export default function ConfirmModal({
  title,
  open,
  children,
  onCancel,
  onConfirm,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };
  return (
    <Modal title={title} open={open} onCancel={onCancel} footer={null} centered>
      <form className="gap flex flex-col pt-2" onSubmit={handleSubmit}>
        {children}
        <p className="text-sm font-bold">This action cannot be undone!</p>
        <p className="my-2 text-sm">Are you sure you want to proceed?</p>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className={`${styles.btn_modal__style} text-neutralDark ring-1 ring-inset ring-neutral hover:bg-neutralDark hover:text-neutralLightest`}
          >
            Abort
          </button>

          <button
            type="submit"
            className={`${styles.btn_modal__style} bg-err ml-2 flex w-fit items-center gap-2 border border-errorDark text-errorDark transition-all ease-in-out hover:bg-errorDark hover:text-neutralLightest`}
          >
            ⚠️ Delete
          </button>
        </div>
      </form>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ConfirmModal.defaultProps = {
  title: "Confirm deletion",
  open: false,
  onCancel: () => {},
  onConfirm: () => {},
  children: null,
};
