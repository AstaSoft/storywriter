import React from "react";
import styles from "./ProjectsTable.module.scss";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ReactComponent as Star } from "../../images/icons/star.svg";
import ThreeDotsMenu from "./ThreeDotsMenu";

const ProjectsTable = ({ projects, handleDetele }) => {
  return (
    <ul className={styles.table}>
      <li className={styles.tableTopLine}>
        <div className={styles.col}>Name</div>
        <div className={styles.col}>Team / Personal</div>
        <div className={styles.col}>Last Updated</div>
        <div className={classnames(styles.col, styles.actionHeader)}></div>
      </li>
      {projects.map((item, index) => (
        <li className={styles.item} key={index}>
          <Link to="/project-settings">
            <div className={styles.col}>
              <Star className={styles.star} />
              <div>
                <span className={styles.name}>{item.name}</span>
              </div>
            </div>
            <div className={styles.col}>{item.type}</div>
            <div className={styles.col}>{item.update}</div>
            <ThreeDotsMenu handleDelete={handleDetele} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProjectsTable;
