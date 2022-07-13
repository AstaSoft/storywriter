import React from "react";
import styles from "./Search.module.scss";
import PropTypes from "prop-types";

const Search = ({ handleSearch }) => {
  return (
    <div className={styles.search}>
      <input
        placeholder="Search"
        type="text"
        onKeyUp={e => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
    </div>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired
};
Search.defaultProps = {
  handleSearch: () => {
    console.log("Default handler is called");
  }
};

export default Search;
