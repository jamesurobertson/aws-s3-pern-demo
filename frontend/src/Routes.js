import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import AllUsers from "./pages/AllUsers";

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/signup" component={CreateUser} />
      <Route path="/users" component={AllUsers} />
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
