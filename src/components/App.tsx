import React from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import history from "../utils/history";
import { Navbar } from "./Navbar";
import { Login } from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import { Route, Router, Switch } from "react-router-dom";

interface AppState {
  user: User | undefined;
}

class App extends React.Component<{}, AppState> {
  private authService: AuthService = new AuthService();

  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined,
    };

    this.setUser = this.setUser.bind(this);
  }
  private setUser(user: User) {
    this.setState({
      user: user,
    });
    console.log("setting the user!: " + user);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="wrapper">
          <Router history={history}>
            <div>
              <Navbar user={this.state.user} />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login">
                  <Login
                    authService={this.authService}
                    setUser={this.setUser}
                  />
                </Route>
                <Route exact path="/profile">
                  <Profile authService={this.authService} user={this.state.user} />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
