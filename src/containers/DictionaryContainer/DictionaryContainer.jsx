import React, { useState } from "react";
import shortid from "shortid";
import classnames from "classnames";
import draftToHtml from "draftjs-to-html";
import styles from "./DictionaryContainer.module.scss";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import DoubleColumnContainer from "../DoubleColumnContainer/DoubleColumnContainer";
import DictionaryContainerLeft from "./DictionaryContainerLeft";
import DictionaryContainerRight from "./DictionaryContainerRight";
import {
  Modal,
  withModal,
  NotificationPopup
} from "../../context/ModalContext";

const DictionaryContainer = ({ context }) => {
  const onTabClick = index => {
    setActiveTab(index);
  };
  const [activeTab, setActiveTab] = useState(0);
  const [term, setTerm] = useState("");
  const [deletedTerm, setDeletedTerm] = useState();

  const [tabsList, setTabsList] = useState([
    {
      label: "Actor",
      description: `{"blocks":[{"key":"ffvng","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      index: 0,
      screenshots: [
        {
          id: shortid.generate(),
          url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb1psVaNO5mnb2KM7OEvhrpq1dOz5YJuZKPtZcpD5sbi5XLBgvNg&s"
        },
        {
          id: shortid.generate(),
          url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmxenU267tQLoC0mIqQw4uAjY5SkBqnpARf4Seois43CCuP8A7&s"
        }
      ],
      links: [
        "Correspondence on the Etymology of Wiki, Ward Cunningham",
        "Ward Cunningham’s original description of Wiki",
        "The wiki principle, The Economist"
      ]
    },
    {
      label: "Athlete",
      description: `{"blocks":[{"key":"ffvng","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      index: 1,
      screenshots: [],
      links: []
    },
    {
      label: "Algorithm",
      description: `{"blocks":[{"key":"ffvng","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      index: 2,
      screenshots: [],
      links: []
    }
  ]);

  const addScreenShotHandler = screenshotURL => {
    const updatedTabList = tabsList.map(tab => {
      if (tab.index === activeTab) {
        return {
          ...tab,
          screenshots: [
            ...tab.screenshots,
            { id: shortid.generate(), url: screenshotURL }
          ]
        };
      } else {
        return tab;
      }
    });

    context.toggleNotification("addedScreenShot");
    setTabsList(updatedTabList);
  };

  const saveDescriptionHandler = (id, text) => {
    console.log(id, text);
    const newActors = [...tabsList];
    const selectedActor = tabsList.find(actor => actor.index === id);
    const indexOfSelectedActor = tabsList.findIndex(
      actor => actor.index === id
    );
    if (selectedActor && tabsList[indexOfSelectedActor].description !== text) {
      newActors.splice(indexOfSelectedActor, 1, {
        ...selectedActor,
        description: text
      });
      setActiveTab(newActors[indexOfSelectedActor].index);
    }
    setTabsList(newActors);
  };

  const handleChange = e => {
    setTerm(e.target.value);
  };

  const handleAddTerm = () => {
    const tabsListCopy = [...tabsList];

    tabsListCopy.push({
      label: term,
      index: tabsListCopy.length,
      description: "",
      screenshots: [],
      links: []
    });
    setTabsList(tabsListCopy);
  };

  const handleDeleteTerm = index => {
    setDeletedTerm(index);
    context.toggleModal("deleteTerm");
  };

  const handleDelete = () => {
    setTabsList(prevTerms =>
      prevTerms.filter((item, termNum) => termNum !== deletedTerm)
    );
    context.closeModal();
    context.toggleNotification("deletedTerm");
  };

  return (
    <>
      <NotificationPopup
        id="termAdded"
        type="success"
        title="Term added"
        text="You’ve successfully created the Term."
      />

      <NotificationPopup
        id="deletedTerm"
        type="fail"
        title="Term removed"
        text="You’ve deleted the Term. You can create a new one"
      />

      <Modal
        id="addTerm"
        width="488px"
        titleStyle={{ marginBottom: "0" }}
        textStyle={{ marginBottom: "49px" }}
        title="Add Term"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus sodales vestibulum"
        acceptButton={
          <Button
            onClick={() => {
              context.toggleNotification("termAdded");
              context.closeModal();
              handleAddTerm();
            }}
            text="Save"
          />
        }
        button={
          <Button
            text="Cancel"
            onClick={context.closeModal}
            buttonStyle="secondary"
          />
        }
      >
        <div className={classnames("fieldWrapper", styles.fieldWrapperPopup)}>
          <Input
            placeholder="Enter term"
            type="text"
            name="term"
            label="Term"
            value={term}
            onChange={handleChange}
          />
        </div>
      </Modal>

      <Modal id="deleteTerm" isCrossIcon={false} className={styles.deletePopup}>
        <p className={styles.deleteText}>
          Are you sure you want to delete this term?
        </p>
        <div className={styles.deletePopupBtns}>
          <Button
            text="Cancel"
            onClick={context.closeModal}
            width="88px"
            height="36px"
            style={{
              background: "none",
              color: "#42526E",
              marginRight: "16px"
            }}
          />
          <Button
            text="Delete"
            onClick={handleDelete}
            className={styles.popupDelete}
            width="88px"
            height="36px"
          />
        </div>
      </Modal>
      <DoubleColumnContainer
        leftColumn={
          <DictionaryContainerLeft
            data={tabsList.map((tab, index) => {
              return {
                label: tab.label,
                index: index,
                description: `${draftToHtml(JSON.parse(tab.description))}`
              };
            })}
            active={activeTab}
            handleTabClick={onTabClick}
          />
        }
        rightColumn={
          <DictionaryContainerRight
            onSaveDescription={saveDescriptionHandler}
            addScreenShot={addScreenShotHandler}
            content={tabsList[activeTab]}
            deleteTerm={handleDeleteTerm}
            index={activeTab}
          />
        }
      />
    </>
  );
};

export default withModal(DictionaryContainer);
