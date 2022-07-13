import React, { createContext, useState } from "react";
import { createPortal } from "react-dom";

import Popup from "../components/Popup/Popup";
import Notification from "../components/Notification/Notification";

const ModalContext = createContext({
  openModalId: "",
  toggleModal: () => {},
  closeModal: () => {},
  toggleNotification: () => {},
  closeNotification: () => {}
});

export const ModalProvider = ({ children }) => {
  const [openModalId, setOpenModalId] = useState("");
  const [openNotificationId, setOpenNotificationId] = useState("");

  const toggleModal = id => setOpenModalId(id);
  const closeModal = () => setOpenModalId("");

  const toggleNotification = id => setOpenNotificationId(id);
  const closeNotification = () => setOpenNotificationId("");

  return (
    <ModalContext.Provider
      value={{
        openModalId,
        openNotificationId,
        toggleModal: id => toggleModal(id),
        closeModal: () => closeModal(),
        toggleNotification: id => {
          toggleNotification(id);
        },
        closeNotification: () => {
          closeNotification();
        }
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const Modal = ({
  id,
  type,
  title,
  text,
  closeAction,
  button,
  acceptButton,
  ...restProps
}) => (
  <ModalContext.Consumer>
    {({ closeModal, openModalId }) => {
      if (openModalId === id) {
        return createPortal(
          <Popup
            {...restProps}
            id={id}
            type={type}
            title={title}
            text={text}
            acceptButton={acceptButton}
            button={button}
            closeAction={closeAction || closeModal}
          />,
          document.getElementById("modal-root")
        );
      }

      return null;
    }}
  </ModalContext.Consumer>
);

export const NotificationPopup = ({
  id,
  type,
  title,
  text,
  closeAction,
  ...restProps
}) => (
  <ModalContext.Consumer>
    {({ closeNotification, openNotificationId }) => {
      if (openNotificationId === id) {
        return createPortal(
          <Notification
            {...restProps}
            type={type}
            title={title}
            text={text}
            closeAction={closeAction || closeNotification}
          />,
          document.getElementById("modal-root")
        );
      }

      return null;
    }}
  </ModalContext.Consumer>
);

export const withModal = WrappedComponent => {
  return props => (
    <ModalContext.Consumer>
      {state => <WrappedComponent {...props} context={{ ...state }} />}
    </ModalContext.Consumer>
  );
};
