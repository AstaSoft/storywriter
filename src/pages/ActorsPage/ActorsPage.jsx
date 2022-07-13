import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import DoubleColumnContainer from "../../containers/DoubleColumnContainer/DoubleColumnContainer";
import ActorsLeftContainer from "../../containers/ActorsContainer/ActorsLeftContainer";
import ActorsRightContainer from "../../containers/ActorsContainer/ActorsRightContainer";
import UserMenu from "../../components/Menu/UserMenu";
import {
  Modal,
  withModal,
  NotificationPopup
} from "../../context/ModalContext";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const ActorsPage = ({ context }) => {
  const [selectedActor, setSelectedActor] = useState();
  const [actorName, setActorName] = useState("");
  const [actors, setActors] = useState([
    {
      id: 1,
      name: "Visitor",
      description: `{"blocks":[{"key":"ffvng","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      userStories: 10,
      epics: 3
    },
    {
      id: 2,
      name: "Seeker",
      description: `{"blocks":[{"key":"ffvng","text":"Hello world","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      userStories: 10,
      epics: 3
    },
    {
      id: 3,
      name: "Seeker",
      description: `{"blocks":[{"key":"ffvng","text":"Hello world","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      userStories: 10,
      epics: 3
    },
    {
      id: 4,
      name: "Seeker",
      description: `{"blocks":[{"key":"ffvng","text":"Hello world","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      userStories: 10,
      epics: 3
    },
    {
      id: 5,
      name: "Seeker",
      description: `{"blocks":[{"key":"ffvng","text":"Hello world","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      userStories: 10,
      epics: 3
    },
    {
      id: 6,
      name: "Seeker",
      description: `{"blocks":[{"key":"ffvng","text":"Hello world","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      userStories: 10,
      epics: 3
    }
  ]);

  const selectHandler = id => {
    if (id) {
      setSelectedActor(actors.filter(actor => actor.id === id)[0]);
    }
  };

  const onSaveDescription = (id, text) => {
    const newActors = [...actors];
    const selectedActor = actors.find(actor => actor.id === id);
    const indexOfSelectedActor = actors.findIndex(actor => actor.id === id);
    if (selectedActor && actors[indexOfSelectedActor].description !== text) {
      newActors.splice(indexOfSelectedActor, 1, {
        ...selectedActor,
        description: text
      });
      setSelectedActor(newActors[indexOfSelectedActor]);
    }
    setActors(newActors);
  };

  const handleChangeName = (id, name) => {
    const newActors = [...actors];
    const selectedActor = actors.find(actor => actor.id === id);
    const indexOfSelectedActor = actors.findIndex(actor => actor.id === id);
    if (selectedActor) {
      newActors.splice(indexOfSelectedActor, 1, { ...selectedActor, name });
      setSelectedActor(newActors.filter(actor => actor.id === id)[0]);
    }
    setActors(newActors);
  };

  const handleDelete = ()=>{
    setActors(actors.filter(actor=>actor.id !== selectedActor.id));
    setSelectedActor()
  }

  return (
    <BasicLayout
      menuType={<UserMenu />}
      contentHead={{
        title: "Actors",
        button: "Add Actor",
        action: "addActor"
      }}
    >
      <NotificationPopup
        id="actorAdded"
        type="success"
        title="Actor added"
        text="You’ve successfully added the Actor."
      />
      <NotificationPopup
        id="actorDeleted"
        type="fail"
        title="Actor removed"
        text="You’ve deleted the Actor. You can create a new one"
      />
      <Modal
        id="deteleActor"
        width="314px"
        height="148px"
        text="Are you sure you want to delete this actor?"
        dialog
        acceptButton={
          <Button
            onClick={() => {
              context.closeModal();
              handleDelete()
              context.toggleNotification("actorDeleted");
            }}
            text="Delete"
          />
        }
        button={
          <Button
            onClick={context.closeModal}
            buttonStyle="secondary"
            text="Cancel"
          />
        }
      />
      <Modal
        id="addActor"
        title="Add Actor"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus sodales vestibulum"
        acceptButton={
          <Button
            text="Save"
            onClick={() => {
              console.log("Submit new actor");
              context.toggleNotification("actorAdded");
              context.closeModal();
            }}
          />
        }
        button={
          <Button
            buttonStyle="secondary"
            onClick={context.closeModal}
            text="Cancel"
          />
        }
      >
        <Input
          label="Actor Name"
          placeholder="Enter Actor Name"
          value={actorName}
          onChange={e => {
            setActorName(e.target.value);
          }}
        />
      </Modal>
      <DoubleColumnContainer
        lwidth="60%"
        rwidth="40%"
        leftColumn={
          <ActorsLeftContainer data={actors} onSelect={selectHandler} />
        }
        rightColumn={
          <ActorsRightContainer
            actor={selectedActor}
            handleChangeName={handleChangeName}
            onSaveDescription={onSaveDescription}
          />
        }
      />
    </BasicLayout>
  );
};

export default withModal(ActorsPage);
