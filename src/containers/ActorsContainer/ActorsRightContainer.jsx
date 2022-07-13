import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./ActorsContainer.module.scss";
import { ReactComponent as ThreeDots } from "../../images/icons/threeDots.svg";
import { withModal } from "../../context/ModalContext";
import InputHidden from "../../components/InputHidden/InputHidden";
import TextEditor from "../../components/TextEditor/TextEditor";

const ActorsRightContainer = ({
  actor,
  handleDelete,
  handleChangeName,
  onSaveDescription,
  context
}) => {
  const dropdownRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentActor, setCurrentActor] = useState(null);

  const handleClickOutside = useCallback(
    e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    },
    [setIsVisible]
  );

  useEffect(() => {
    setCurrentActor(actor);
  }, [actor]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={styles.rightWrapper}>
      {currentActor && actor && (
        <>
          <div className={styles.actorTop}>
            <InputHidden
              name="role"
              value={currentActor.name}
              hiddenValue={currentActor.name}
              textStyle={{
                fontSize: "24px",
                fontWeight: 500,
                padding: "0"
              }}
              inputStyle={{
                fontSize: "24px",
                height: "36px",
                padding: "0 8px"
              }}
              onChange={e => {
                setCurrentActor({ ...currentActor, name: e.target.value });
              }}
              onSave={() => {
                handleChangeName(currentActor.id, currentActor.name);
              }}
              onCancel={() => {
                setCurrentActor(actor);
              }}
            />
            <span className={styles.threeDots}>
              <ThreeDots
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
              />
              {isVisible && (
                <div ref={dropdownRef} className={styles.dropdown}>
                  <button
                    onClick={() => {
                      context.toggleModal("deteleActor");
                      setIsVisible(!isVisible);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </span>
          </div>
          <div className={styles.description}>
            <h3>Description</h3>
            <div className={styles.editor}>
              <TextEditor
                onSave={onSaveDescription}
                id={actor.id}
                placeholder="Add description"
                text={actor.description}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withModal(ActorsRightContainer);
