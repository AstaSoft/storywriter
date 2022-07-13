import React from "react";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import ProjectsContainer from "../../containers/ProjectsContainer/ProjectsContainer";
import UserMenu from "../../components/Menu/UserMenu";

const MembersPage = () => {
	return (
		<BasicLayout 
			menuType={<UserMenu />} 
			contentHead={{title: "Projects", button: "Create Project", action: "createProject"}}
		>
			<ProjectsContainer />
		</BasicLayout>
	);
};

export default MembersPage;
