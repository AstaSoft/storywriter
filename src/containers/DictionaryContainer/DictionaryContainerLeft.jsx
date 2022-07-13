import React from "react";
import styles from "./DictionaryContainer.module.scss";
import Tabs from "./Tabs";
import Search from "../../components/Search/Search";

const DictionaryContainerLeft = ({ data, active, handleTabClick }) => {
  return (
    <div className={styles.tabsWrapper}>
      {data && data.length > 0 ? (
        <>
          <div className={styles.dictionarySearch}>
            <Search
              handleSearch={() => {
                console.log("Search function");
              }}
            />
          </div>

          <Tabs
            handleTabClick={handleTabClick}
            data={data}
            activeTabIndex={active}
          />
        </>
      ) : (
        <p className={styles.noResult}>
          <span>There is nothing here yet. </span> <br /> Please, add a Term to
          start a work
        </p>
      )}
    </div>
  );
};

export default DictionaryContainerLeft;
