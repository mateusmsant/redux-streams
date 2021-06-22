import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import StreamList from "./streams/StreamList";
import StreamEdit from "./streams/StreamEdit";
import StreamCreate from "./streams/StreamCreate";
import StreamShow from "./streams/StreamShow";
import StreamDelete from "./streams/StreamDelete";
import history from "../history";

import "./styles/App.css";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div className="main">
          <Navbar />
          <Switch>
            <Route exact path="/" component={StreamList} />
            <Route exact path="/streams/new" component={StreamCreate} />
            <Route exact path="/streams/edit/:id" component={StreamEdit} />
            <Route exact path="/streams/delete/:id" component={StreamDelete} />
            <Route exact path="/streams/show" component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
