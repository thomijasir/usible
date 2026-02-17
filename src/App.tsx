import { Router, Route } from "@solidjs/router";
import { HomePage, GettingStartedPage, StoriesPage } from "./docs/pages";
import "./docs/styles/docs.css";

function App() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/stories" component={GettingStartedPage} />
      <Route path="/stories/:name" component={StoriesPage} />
    </Router>
  );
}

export default App;
