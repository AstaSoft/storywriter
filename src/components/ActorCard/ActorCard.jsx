import React from "react";
import styles from "./ActorCard.module.scss";
import PropTypes from "prop-types";
import userPhoto from "../../images/cards/user.png";

const ActorCard = ({ image, type, text, storiesCount, epicsCount }) => {
  return (
    <div className={styles.actor}>
      <div
        className={styles.actorImage}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={styles.actorContent}>
        <span className={styles.actorType}>{type}</span>
        <p className={styles.actorText} dangerouslySetInnerHTML={{__html: text}}></p>
        <div className={styles.actorData}>
          <span className={styles.item}>
            <span className={styles.itemCount}>{storiesCount}</span> user
            stories
          </span>
          <span className={styles.item}>
            <span className={styles.itemCount}>{epicsCount}</span> epics
          </span>
        </div>
      </div>
    </div>
  );
};

ActorCard.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  storiesCount: PropTypes.number,
  epicsCount: PropTypes.number
};

ActorCard.defaultProps = {
  image: userPhoto,
  type: "",
  text: "",
  storiesCount: "",
  epicsCount: ""
};

export default ActorCard;
