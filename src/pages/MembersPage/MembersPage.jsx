import React from "react";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import MembersContainer from "../../containers/MembersContainer/MembersContainer";
import TeamMenu from "../../components/Menu/TeamMenu";

const MembersPage = () => {
  return (
    <BasicLayout
      contentHead={{
        title: "Team Members",
        button: "Invite Member",
        action: "inviteMember"
      }}
      menuType={<TeamMenu />}
    >
      <MembersContainer />
    </BasicLayout>
  );
};

export default MembersPage;
