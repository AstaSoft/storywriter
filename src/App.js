import React from "react";

import HeaderContainer from "./containers/HeaderContainer/HeaderContainer";

import "./App.scss";

const App = ({ children }) => (
  <div className="App">
    <HeaderContainer />
    {children}
  </div>
);

export default App;
