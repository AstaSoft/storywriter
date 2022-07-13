import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.scss";
import PropTypes from "prop-types";
import DotsMenuBar from "../DotsMenuBar/DotsMenuBar";

const ProjectCard = ({
  name,
  logo,
  membersCount,
  projectsCount,
  deleteTeam,
  index
}) => {
  return (
    <div className={styles.projectWrapper}>
      <Link to="/members">
        <div
          className={styles.projectLogo}
          style={{ backgroundImage: `url(${logo})` }}
        />
        <div>
          <span className={styles.projectName}>{name}</span>
          <span className={styles.projectData}>{membersCount} members</span>
          <span className={styles.projectData}>{projectsCount} projects</span>
        </div>
      </Link>
      <DotsMenuBar
        deleteItem={deleteTeam}
        className={styles.menuWrapper}
        index={index}
      />
    </div>
  );
};

ProjectCard.propTypes = {
  name: PropTypes.string,
  membersCount: PropTypes.number,
  projectsCount: PropTypes.number
};

ProjectCard.defaultProps = {
  name: "",
  membersCount: 0,
  projectsCount: 0
};

export default ProjectCard;
