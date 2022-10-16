import { User, UserAttribute } from "../model/Model";
import { Auth, Amplify } from "aws-amplify";
import { config } from "./config";
import { CognitoUser } from "@aws-amplify/auth";
import * as AWS from "aws-sdk";
import { Credentials } from "aws-sdk/lib/credentials";

// amplify configuration
Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    identityPoolId: config.IDENTITY_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  public async login(userName: string, password: string): Promise<User | undefined> {
    try {
      const user = (await Auth.signIn(userName, password)) as CognitoUser; //copy fromauthservice backend
      return {
        cognitoUser: user, 
        userName: user.getUsername()

      }
    } catch (error) {
      return undefined;
    }
  }

  // create a data table
  public async getUserAttributes(user: User): Promise<UserAttribute[]> {
    // promise return arrayy of userAttribute
    const result: UserAttribute[] = [];
    const attributes = await Auth.userAttributes(user.cognitoUser) //get attributes
    //push  array of user attributes: sub, email, etc
    result.push(...attributes)
    return result;
  }
}
