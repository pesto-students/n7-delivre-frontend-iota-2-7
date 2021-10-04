import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./features/home/Home";
import * as Sentry from "@sentry/react";
import ErrorBoundary from "./shared/components/ErrorBoundary";

function App() {
  return (
    
    <Router>
      <Switch>
        <ErrorBoundary>
          <Route path="/">
            <Home />
          </Route>
        </ErrorBoundary>
      </Switch>
    </Router>
  );
}

export default Sentry.withProfiler(App);
