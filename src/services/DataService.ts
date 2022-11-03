import { ICreateSpaceState } from "../components/spaces/CreateSpace";
import { Space } from "../model/Model";
import { S3, config } from "aws-sdk";
import { config as appConfig } from "./config";
import { generateRandomId } from "../utils/Utils";

config.update({
  region: appConfig.REGION,
});

export class DataService {
  public async createSpace(iCreateSpace: ICreateSpaceState) {
    //upload photo to s3 bucket
    if (iCreateSpace.photo) {
      const photoUrl = await this.uploadPublicFile(
        iCreateSpace.photo,
        appConfig.SPACES_PHOTOS_BUCKET
      );
      iCreateSpace.photoURL = photoUrl;
      iCreateSpace.photo = undefined;
    }

    const requestUrl = appConfig.api.spacesUrl;
    const requestOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify(iCreateSpace),
    };
    // make a POST request
    const result = await fetch(requestUrl, requestOptions);
    const resultJSON = await result.json();
    //return newly created object id
    return JSON.stringify(resultJSON.id);
  }

  private async uploadPublicFile(file: File, bucket: string) {
    const fileName = generateRandomId() + file.name;
    // create and config s3 bucket to store photos
    const uploadResult = await new S3({ region: appConfig.REGION })
      .upload({
        Bucket: bucket,
        Key: fileName,
        Body: file,
        ACL: "public-read",
      })
      .promise();

    return uploadResult.Location; // image url
  }

  // return the spaces
  public async getSpaces(): Promise<Space[]> {
    const requestUrl = appConfig.api.spacesUrl;
    const requestResult = await fetch(requestUrl);
    const responseJSON = await requestResult.json()
    return responseJSON
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    // async await function will return a promised result which is a string or undefined
    if (spaceId === "123") {
      return "5555";
    } else {
      return undefined;
    }
  }
}
