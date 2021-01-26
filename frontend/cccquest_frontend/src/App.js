import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import Iteration from "./pages/Iteration";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="Navigation">
      <h1>Navigation</h1>
      <ul>
        <li><Link to="/">Overview</Link></li>
        <li><Link to="/iteration">New Iteration</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navigation />
        </header>
        <Switch>
          <Route path="/" exact component={Overview} />
          <Route path="/iteration" exact component={Iteration} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
