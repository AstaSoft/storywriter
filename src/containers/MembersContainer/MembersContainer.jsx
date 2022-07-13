import React, { useEffect } from "react";
import styles from "./MembersContainer.module.scss";
import Search from "../../components/Search/Search";
import MembersTable from "../../components/MembersTable/MembersTable";
import { ReactComponent as TeamsEmptyLogo } from "../../images/icons/teamsEmpty.svg";
import tableItems from "../../components/MembersTable/tableItems";
import AutocompleteInput from "../../components/AutocompleteInput/AutocompleteInput";
import Button from "../../components/Button/Button";
import {
  Modal,
  withModal,
  NotificationPopup,
} from "../../context/ModalContext";

const MembersContainer = ({ context }) => {
  const handleDeteleMember = (id) => {
    context.toggleModal("deleteModal");
  };

  useEffect(() => {
    return () => {
      context.closeNotification();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.members}>
      <NotificationPopup
        id="memberAdded"
        type="success"
        title="New member added"
        text="You’ve invited a new member."
      />
      <NotificationPopup
        id="memberRemoved"
        type="fail"
        title="Team member removed"
        text="You’ve deleted the Team member. You can invite a new one"
      />
      <Modal
        id="deleteModal"
        dialog
        text="Are you sure you want to remove this member?"
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
              context.toggleNotification("memberRemoved");
              context.closeModal();
            }}
            width="88px"
            height="36px"
            text="Delete"
          />
        }
      />
      <Modal
        id="inviteMember"
        width="488px"
        titleStyle={{ marginBottom: "0" }}
        textStyle={{ marginBottom: "49px" }}
        title="Invite members"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus sodales vestibulum"
        acceptButton={
          <Button
            onClick={() => {
              context.toggleNotification("memberAdded");
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
        <AutocompleteInput
          placeholder="Enter email address"
          name="email"
          label="Email address(es)"
        />
      </Modal>
      <div className={styles.membersContent}>
        {tableItems.length > 0 ? (
          <>
            <div className={styles.membersSearch}>
              <Search
                handleSearch={() => {
                  console.log("Search function");
                }}
              />
            </div>

            <div className={styles.membersTableWrap}>
              <MembersTable
                handleDetele={handleDeteleMember}
                members={tableItems}
              />
            </div>
          </>
        ) : (
          <div className={styles.emptyWrap}>
            <TeamsEmptyLogo />
            <div className={styles.emptyInfo}>
              <h5>There is nothing here yet.</h5>
              <p>
                Please, add a Team to start a work. After that, you’ll find your
                team and work right here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withModal(MembersContainer);
