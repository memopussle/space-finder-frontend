import { ICreateSpaceState } from "../components/spaces/CreateSpace";
import { Space } from "../model/Model";

export class DataService {

  public async createSpace(iCreateSpace: ICreateSpaceState) {
    return '123'; 
 }

  // return the spaces
  public async getSpaces(): Promise<Space[]> {
    const result: Space[] = []; // result is an array of Space
    result.push({
      location: "Paris",
      name: "Best Location",
      spaceId: "123",
    });
    result.push({
      location: "Paris",
      name: "Best Location",
      spaceId: "124",
    });
    result.push({
      location: "Paris",
      name: "Best Location",
      spaceId: "125",
    });
    return result;
  }

  public async reserveSpace(spaceId: string):Promise<string | undefined>{ // async await function will return a promised result which is a string or undefined
    if (spaceId === '123') {
      return('5555')
    } else {
      return undefined;
    }
  }
}
