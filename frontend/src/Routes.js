import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/signup" component={CreateUser} />
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
