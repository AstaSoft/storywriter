import React, { useState } from "react";
import styles from "./TeamProjectsContainer.module.scss";
import classnames from "classnames";
import Button from "../../components/Button/Button";
import Search from "../../components/Search/Search";
import ProjectsTable from "../../components/ProjectsTable/ProjectsTable";
import tableItems from "../../components/ProjectsTable/tableItems";
import Input from "../../components/Input/Input";
import Dropdown from "../../components/Dropdown/Dropdown";
import { ReactComponent as TeamsEmptyLogo } from "../../images/icons/teamsEmpty.svg";
import {
  Modal,
  withModal,
  NotificationPopup,
} from "../../context/ModalContext";

const TeamProjectsContainer = ({ context }) => {
  const [projectName, setProjectName] = useState();
  const [sort, setSort] = useState({});

  const handleChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleDeteleProject = (id) => {
    context.toggleModal("deleteModal");
  };

  const handleSortChange = (e) => {
    setSort(e);
  };

  return (
    <div className={styles.projects}>
      <NotificationPopup
        id="projectAdded"
        type="success"
        title="Project added"
        text="You’ve successfully created the Project. "
      />
      <NotificationPopup
        id="projectRemoved"
        type="fail"
        title="Project removed"
        text="You’ve deleted the Team project. You can create a new one"
      />

      <Modal
        id="deleteModal"
        dialog
        text="Are you sure you want to delete this project?"
        button={
          <Button
            width="88px"
            height="36px"
            buttonStyle="secondary"
            text="Cancel"
            onClick={context.closeModal}
          />
        }
        acceptButton={
          <Button
            onClick={() => {
              context.toggleNotification("projectRemoved");
              context.closeModal();
            }}
            width="88px"
            height="36px"
            text="Delete"
          />
        }
      />

      <Modal
        id="createProject"
        width="488px"
        titleStyle={{ marginBottom: "0" }}
        textStyle={{ marginBottom: "49px" }}
        title="Create Project"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus sodales vestibulum"
        acceptButton={
          <Button
            onClick={() => {
              context.toggleNotification("projectAdded");
              context.closeModal();
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
            placeholder="Enter project name"
            type="text"
            name="name"
            label="Project name"
            value={projectName}
            onChange={handleChange}
          />
        </div>
      </Modal>

      <div className={styles.projectsContent}>
        {tableItems.length > 0 ? (
          <>
            <div className={styles.projectsSearch}>
              <div style={{ width: "40%" }}>
                <Search />
              </div>

              <div className={styles.dropdownWrapper}>
                <Dropdown
                  id={styles.sorting}
                  placeholder="All types"
                  options={[
                    { id: "7", value: "Item" },
                    { id: "5", value: "Item" },
                    { id: "9", value: "Item" },
                    { id: "3", value: "Item" },
                    { id: "8", value: "Item" },
                  ]}
                  value={sort}
                  onChange={(e) => {
                    handleSortChange(e);
                  }}
                />
              </div>
            </div>

            <div className={styles.projectsTableWrap}>
              <ProjectsTable
                handleDetele={handleDeteleProject}
                projects={tableItems}
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.emptyWrap}>
              <TeamsEmptyLogo />
              <div className={styles.emptyInfo}>
                <h5>There is nothing here yet.</h5>
                <p>
                  Please, add a Project to start a work. After that, you can
                  work right here.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withModal(TeamProjectsContainer);
