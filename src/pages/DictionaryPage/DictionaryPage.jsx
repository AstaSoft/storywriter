import React from "react";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import UserMenu from "../../components/Menu/UserMenu";
import DictionaryContainer from "../../containers/DictionaryContainer/DictionaryContainer";

const DictionaryPage = () => {
  return (
    <BasicLayout
      menuType={<UserMenu />}
      contentHead={{
        title: "Dictionary",
        button: "Add Term",
        action: "addTerm"
      }}
    >
      <DictionaryContainer />
    </BasicLayout>
  );
};

export default DictionaryPage;
