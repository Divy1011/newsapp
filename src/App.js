import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 6;
  const apikey = "01fc976ebd2d4448aef270ddbf022dd6";
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar height={4} color="#f11946" progress={progress} />
        <Switch>
          <Route exact path="/">
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="general"
              pagesize={pageSize}
              category="general"
            />
          </Route>
          <Route exact path="/business">
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="business"
              pagesize={pageSize}
              category="business"
            />
        </Route>
          <Route exact path="/entertainment">
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="entertainment"
              pagesize={pageSize}
              category="entertainment"
            />
          </Route>
          <Route exact path="/general">
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="general"
              pagesize={pageSize}
              category="general"
            />
          </Route>
          <Route exact path="/health">
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="health"
              pagesize={pageSize}
              category="health"
            />
          </Route>
          <Route exact path="/science">
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="science"
              pagesize={pageSize}
              category="science"
            />
          </Route>
          <Route exact path="/sports">
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="sports"
              pagesize={pageSize}
              category="sports"
            />
          </Route>
          <Route exact path="/technology">
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="technology"
              pagesize={pageSize}
              category="technology"
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
