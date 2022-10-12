import React from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { Login } from "./Login";

interface AppState {
  user: User | undefined;
}


class App extends React.Component<{}, AppState> {
  private authService: AuthService = new AuthService();

  render() {
    return (
      <div>
        <h1>App from class works!!!!</h1>
        <Login authService={this.authService}/>
      </div>
    );
  }
}

export default App;
