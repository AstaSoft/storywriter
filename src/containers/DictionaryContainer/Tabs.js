import React from "react";
import Tab from "./Tab";

const Tabs = ({ activeTabIndex, data, handleTabClick }) => (
  <div>
    {data.map(({ label, description, index }, indexItem) => {
      const isActive = activeTabIndex === indexItem;
      return (
        <Tab
          key={index}
          label={label}
          isActive={isActive}
          handleTabClick={handleTabClick}
          tabIndex={indexItem}
          description={description}
        />
      );
    })}
  </div>
);

export default Tabs;
