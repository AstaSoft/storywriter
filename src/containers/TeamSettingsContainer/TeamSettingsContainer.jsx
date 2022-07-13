import React, { useState, useEffect } from "react";
import styles from "./TeamSettingsContainer.module.scss";
import withUserInfo from "../../hoc/withUserInfo";
import EditableField from "../../components/EditableField/EditableField";
import ImageElement from "../../components/ImageElement/ImageElement";
import AddPhotoPopup from "../../components/AddPhotoPopup/AddPhotoPopup";
import Button from "../../components/Button/Button";
import { withModal, Modal, NotificationPopup } from "../../context/ModalContext";

const TeamSettingsContainer = ({
  team,
  context
}) => {
  const [showAddPhotoPopup, setShowAddPhotoPopup] = useState(false);
  const [changedTeam, setChangedTeam] = useState({});

  useEffect(() => {
    setChangedTeam(team);
  }, [setChangedTeam, team]);

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
          src={changedTeam.photo}
          title={changedTeam.photo ? "Edit profile photo" : "Upload an image"}
          onSave={newPhoto => {
            setChangedTeam({ ...changedTeam, photo: newPhoto });
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
              setChangedTeam({ ...changedTeam, photo: "" });
              context.closeModal();
            }}
          />
        }
        dialog
      />
      <div>
        <ImageElement
          image={changedTeam.photo}
          onUpdate={() => {
            setShowAddPhotoPopup(true);
          }}
          onDelete={() => {
            context.toggleModal("photoDelete");
          }}
        />
      </div>
      <div className={styles.userInfo}>
        <EditableField
          value={changedTeam.name}
          name="name"
          onChange={({ target }) => {
            setChangedTeam({ ...changedTeam, name: target.value });
          }}
          onCancel={() => {
            setChangedTeam({ ...changedTeam, name: team.name });
          }}
          onSave={() => {
            console.log("Name is saved");
          }}
          label="Name"
          hiddenValue={changedTeam.name ? changedTeam.name : "Add name"}
        />
      </div>
    </div>
  );
};

export default withUserInfo(withModal(TeamSettingsContainer));
