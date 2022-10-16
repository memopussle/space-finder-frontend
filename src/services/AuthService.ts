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
  // login from AuuthServiice backkend
  public async login(userName: string, password: string) {
    const user = (await Auth.signIn(userName, password)) as CognitoUser; 
  }

  // create a data table
  public async getUserAttributes(user: User): Promise<UserAttribute[]> {
    // promise return arrayy of userAttribute
    const result: UserAttribute[] = [];
    result.push({
      Name: "description",
      Value: "Best user ever",
    });
    result.push({
      Name: "job",
      Value: "Engineer",
    });
    result.push({
      Name: "age",
      Value: "25",
    });
    result.push({
      Name: "experience",
      Value: "3 years",
    });
    return result;
  }
}
