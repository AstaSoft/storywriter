import React, { useState } from "react";
import styles from "./ProjectSettingsContainer.module.scss";
import EditableField from "../../components/EditableField/EditableField";
import ImageElement from "../../components/ImageElement/ImageElement";
import AddPhotoPopup from "../../components/AddPhotoPopup/AddPhotoPopup";
import Button from "../../components/Button/Button";
import {
  withModal,
  Modal,
  NotificationPopup
} from "../../context/ModalContext";

import tableItems from "../../components/ProjectsTable/tableItems";
import teamsImg from "../../images/icons/teamsImg.png";

const ProjectSettingsContainer = ({ context }) => {
  const [name, setName] = useState(tableItems[0].name || "");
  const [url, setUrl] = useState(tableItems[0].url || "");
  const [description, setDescription] = useState(
    tableItems[0].description || ""
  );
  const [showAddPhotoPopup, setShowAddPhotoPopup] = useState(false);

  return (
    <div className={styles.containerWrap}>
      <NotificationPopup
        id="photoDeleted"
        type="fail"
        title="Project photo removed"
        text="We’ve deleted your project photo. Please, upload a new one"
        closeAction={() => {
          context.closeNotification();
        }}
      />
      <NotificationPopup
        id="photoAdded"
        type="success"
        title="Project photo added"
        text="You’ve uploaded your project photo. It may take a few minutes to display everywhere"
        closeAction={() => {
          context.closeNotification();
        }}
      />
      {showAddPhotoPopup && (
        <AddPhotoPopup
          src={teamsImg}
          title={teamsImg ? "Edit project photo" : "Upload an image"}
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

      <div>
        <ImageElement
          image={teamsImg}
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
            setName(tableItems[0].name || "");
          }}
          onSave={() => {
            console.log(name);
          }}
          label="Name"
          hiddenValue={name ? name : "Add name"}
        />
        <EditableField
          value={url}
          name="url"
          type="url"
          onChange={({ target }) => {
            setUrl(target.value);
          }}
          onCancel={() => {
            setUrl(tableItems[0].url || "");
          }}
          onSave={() => {
            console.log(url);
          }}
          label="URL"
          hiddenValue={url ? url : "Add url"}
        />
        <EditableField
          value={description}
          name="description"
          className={styles.description}
          onChange={({ target }) => {
            setDescription(target.value);
          }}
          onCancel={() => {
            setDescription(tableItems[0].description || "");
          }}
          onSave={() => {
            console.log(description);
          }}
          label="Description"
          hiddenValue={description ? description : "Add description"}
        />
      </div>
    </div>
  );
};

export default withModal(ProjectSettingsContainer);
