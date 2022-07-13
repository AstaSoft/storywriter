import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "./App";
import store from "./store";
import routes from "./routes/routes";
import { NotFoundPage } from "./pages";
import { ModalProvider } from "./context/ModalContext";
import RouteWithSubRoutes from "./helpers/RouteWithSubRoutes";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ModalProvider>
        <App>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </App>
      </ModalProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
