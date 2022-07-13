import React, { useEffect, useState } from "react";
// import styles from "./styles.module.scss";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import TeamSettingsContainer from "../../containers/TeamSettingsContainer/TeamSettingsContainer";
import TeamMenu from "../../components/Menu/TeamMenu";

const TeamSettingsPage = () => {
  const [team, setTeam] = useState({});

  useEffect(() => {
    // TODO: getting team info
    setTeam({
      name: "Leansquad",
      photo: ""
    //   photo:
    //     "https://media.licdn.com/dms/image/C4E0BAQGDGyjgokP8FA/company-logo_400_400/0?e=1580947200&v=beta&t=M02Qc8AQcDhVF-BprDN9ciHtXZ2dS_fpq8wUQydeZao"
    });
  }, []);

  return (
    <BasicLayout menuType={<TeamMenu />}>
      <TeamSettingsContainer team={team} />
    </BasicLayout>
  );
};

export default TeamSettingsPage;
