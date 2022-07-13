import React from "react";
import styles from "./ActorsContainer.module.scss";
import ActorCard from "../../components/ActorCard/ActorCard";
import Dropdown from "../../components/Dropdown/Dropdown";
import draftToHtml from "draftjs-to-html";

const ActorsLeftContainer = ({ data, active, onSelect }) => {
  return (
    <div className={styles.leftContainerWrapper}>
      <div className={styles.dropdownWrapper}>
        <Dropdown
          id="apps"
          options={[
            { id: "1", value: "Apps" },
            { id: "2", value: "Apps" },
            { id: "3", value: "Apps" }
          ]}
        />
      </div>
      <div className={styles.actorsWrapper}>
        {data.map(actor => (
          <div
            key={actor.id}
            className={styles.actorCard}
            onClick={() => {
              onSelect(actor.id);
            }}
          >
            <ActorCard
              type={actor.name}
              text={`${draftToHtml(JSON.parse(actor.description))}`}
              storiesCount={actor.userStories}
              epicsCount={actor.epics}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorsLeftContainer;
