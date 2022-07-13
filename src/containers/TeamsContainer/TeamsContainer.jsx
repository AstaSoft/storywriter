import React, {useState} from "react";
// import classnames from "classnames";
import styles from "./TeamsContainer.module.scss";
import { ReactComponent as TeamsEmptyLogo } from "../../images/icons/teamsEmpty.svg";
import { withModal, Modal,NotificationPopup } from "../../context/ModalContext";

import CreateTeamPopupForm from "../../forms/CreateTeamPopupForm/CreateTeamPopupForm";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Button from "../../components/Button/Button";
import TeamsImg from "../../images/icons/teamsImg.png";

const TeamsContainer = ({context}) => {

  const [teams, setTeams] = useState([]);
  const [deletedTeam, setDeletedTeam] = useState();

  const handleAddTeam = (team) => {
    const teamsCopy = [...teams];

    teamsCopy.push(team);
    setTeams(teamsCopy);
    context.closeModal();
    context.toggleNotification("addTeam")
  }

  const handleDeleteTeam = (teamIndex) => {
    setDeletedTeam(teamIndex);
    context.toggleModal("deleteTeam");
    
  }

  const handleDelete = () => {
    setTeams(prevTeams => (prevTeams.filter((item, teamNum) => (teamNum !== deletedTeam)) ));
    context.closeModal();
    context.toggleNotification("deleteTeam");
  }

  return (
    <div className={styles.containerWrap}>
      <NotificationPopup 
        id="addTeam"
        type="success"
        title="New team added"
        text="We’ve created a new team. It may take a few minutes to display everywhere"
      />

      <NotificationPopup 
        id="deleteTeam"
        type="fail"
        title="Your team removed"
        text="You’ve deleted the Team. You can create a new one"
      />

      <Modal 
        id="addTeam"
        isCrossIcon={false}
        title="Create a team"
      >
        <CreateTeamPopupForm acceptButton={handleAddTeam} closeButton={context.closeModal}/>
      </Modal>

      <Modal 
        id="deleteTeam"
        isCrossIcon={false}
        className={styles.deletePopup}
      >
        <p className={styles.deleteText}>Are you sure you want to delete this team?</p>
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

      {teams.length ? (
        teams.map((item, index) => (
          <ProjectCard 
            key={index}
            name={item.name}
            logo={TeamsImg}
            membersCount={5}
            projectsCount={8}
            deleteTeam={handleDeleteTeam}
            index={index}
          />
        ))
      ) : (
        <div className={styles.emptyInfoWrap}>
          <div className={styles.emptyInfo}>
            <TeamsEmptyLogo />
            <h5>There is nothing here yet.</h5>
            <p>Please, add a Team to start a work. After that, you’ll find your team and work right here.</p>
          </div>
        </div>
        
      )}
      

    </div>
  );
};

export default withModal(TeamsContainer);
