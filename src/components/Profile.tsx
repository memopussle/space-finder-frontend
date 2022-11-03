import React from "react";
import { Link } from "react-router-dom";
import { User, UserAttribute } from "../model/Model";
import { AuthService } from "../services/AuthService";

interface ProfileState {
  userAttributes: UserAttribute[];
}
interface ProfileProps {
     user: User | undefined;
  authService: AuthService;
}

class Profile extends React.Component<ProfileProps, ProfileState> {
  state: ProfileState = {
    userAttributes: []
  }

  async componentDidMount() { // get data when data mounted
    if (this.props.user) { // if user logs in
      const userAtrs = await this.props.authService.getUserAttributes(this.props.user)
      this.setState({
        userAttributes: userAtrs
      })
    }
  }

  private renderUserAttributes() {
    const rows = [];

    for (const userAttribute of this.state.userAttributes) {
      rows.push(
        <tr key={userAttribute.Name}>
          <td>{userAttribute.Name}</td>
          <td>{userAttribute.Value}</td>
        </tr>
      );
    }
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  render() {
    let profileSpace;
    if (this.props.user) {
      profileSpace = profileSpace = (
        <div>
          <h3>Hello {this.props.user.userName}</h3>
          Here are your attributes:
          {this.renderUserAttributes()}
        </div>
      );
    } else {
      profileSpace = (
        <div>
          Please <Link to="login">login</Link>
        </div>
      );
    }
    return (
      <div>
        <h1>Welcome to profile page </h1>
        {profileSpace}
      </div>
    );
  }
}

export default Profile;
