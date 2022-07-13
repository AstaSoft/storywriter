import React, { useState } from "react";
import styles from "./UserProfileContainer.module.scss";
import withUserInfo from "../../hoc/withUserInfo";
import EditableField from "../../components/EditableField/EditableField";
import ImageElement from "../../components/ImageElement/ImageElement";
import ChangePasswordForm from "../../forms/ChangePasswordForm/ChangePasswordForm";
import AddPhotoPopup from "../../components/AddPhotoPopup/AddPhotoPopup";
import Button from "../../components/Button/Button";
import {
  withModal,
  Modal,
  NotificationPopup,
} from "../../context/ModalContext";

const UserProfileContainer = ({
  userInfo: { firstName, lastName, login, userPosition, avatar },
  context,
}) => {
  const [name, setName] = useState(`${firstName} ${lastName}` || "");
  const [email, setEmail] = useState(`${login}` || "");
  const [position, setPosition] = useState(`${userPosition}` || "");
  const [showAddPhotoPopup, setShowAddPhotoPopup] = useState(false);

  const onUpdatePassword = () => {
    console.log("Password is updated");
    context.closeModal();
  };

  return (
    <div className={styles.containerWrap}>
      <NotificationPopup
        id="photoDeleted"
        type="fail"
        title="Profile photo removed"
        text="We’ve deleted your profile photo. Please, upload a new one"
        closeAction={() => {
          context.closeNotification();
        }}
      />
      <NotificationPopup
        id="photoAdded"
        type="success"
        title="Profile photo added"
        text="You’ve uploaded your profile photo. It may take a few minutes to display everywhere"
        closeAction={() => {
          context.closeNotification();
        }}
      />
      {showAddPhotoPopup && (
        <AddPhotoPopup
          src={avatar}
          title={avatar ? "Edit profile photo" : "Upload an image"}
          onSave={() => {
            context.toggleNotification("photoAdded");
            setShowAddPhotoPopup(!showAddPhotoPopup);
          }}
          closeAction={() => {
            setShowAddPhotoPopup(!showAddPhotoPopup);
          }}
        />
      )}
      <Modal
        id="photoDelete"
        text="Are you sure you want to delete this photo?"
        button={
          <Button
            width="88px"
            height="36px"
            buttonStyle="secondary"
            text="Cancel"
            onClick={() => {
              context.closeModal();
            }}
          />
        }
        acceptButton={
          <Button
            width="88px"
            height="36px"
            text="Delete"
            onClick={() => {
              context.toggleNotification("photoDeleted");
              context.closeModal();
            }}
          />
        }
        dialog
      />

      <Modal
        id="passwordChange"
        title="Change password"
        titleCentered
        isCrossIcon
      >
        <ChangePasswordForm handleUpdate={onUpdatePassword} />
      </Modal>
      <div>
        <ImageElement
          image={avatar}
          onUpdate={() => {
            setShowAddPhotoPopup(true);
          }}
          onDelete={() => {
            context.toggleModal("photoDelete");
            // setShowDeletePopup(true);
          }}
        />
      </div>
      <div className={styles.userInfo}>
        <EditableField
          value={name}
          name="name"
          onChange={({ target }) => {
            setName(target.value);
          }}
          onCancel={() => {
            setName(`${firstName} ${lastName}` || "");
          }}
          onSave={() => {
            console.log(name);
          }}
          label="Name"
          hiddenValue={name ? name : "Add name"}
        />
        <EditableField
          value={email}
          name="email"
          type="email"
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          onCancel={() => {
            setEmail(`${login}` || "");
          }}
          onSave={() => {
            console.log(email);
          }}
          label="Email"
          hiddenValue={email ? email : "Add email"}
        />
        <EditableField
          value={position}
          name="position"
          onChange={({ target }) => {
            setPosition(target.value);
          }}
          onCancel={() => {
            setPosition(`${userPosition}` || "");
          }}
          onSave={() => {
            console.log(position);
          }}
          label="Position"
          hiddenValue={position ? position : "Add position"}
        />
        <span
          className={styles.changePasswordButton}
          onClick={() => {
            context.toggleModal("passwordChange");
          }}
        >
          <span
            className={styles.changePasswordButton}
            onClick={() => {
              context.toggleModal("passwordChange");
            }}
          >
            Change password
          </span>
        </span>
      </div>
    </div>
  );
};

export default withUserInfo(withModal(UserProfileContainer));
