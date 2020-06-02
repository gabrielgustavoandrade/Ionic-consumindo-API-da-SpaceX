import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { Route, Redirect } from "react-router";
import LaunchesPage from "./pages/LaunchesPage";
import LaunchPage from "./pages/LaunchPage";

const Router: React.FC = (props) => (
  <IonReactRouter>
    <IonSplitPane contentId="main-content" when="md">
      {props.children}
      <IonRouterOutlet id="main-content">
        <Route path="/launches" exact>
          <LaunchesPage />
        </Route>
        <Route path="/launches/:id" exact>
          <LaunchPage />
        </Route>
        <Route path="/" exact>
          <Redirect to="/launches" />
        </Route>
      </IonRouterOutlet>
    </IonSplitPane>
  </IonReactRouter>
);

export default Router;
