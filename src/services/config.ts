const spacesUrl =
  "https://rpm7j0f834.execute-api.ap-southeast-2.amazonaws.com/prod/";

export const config = {
  REGION: "ap-southeast-2",
  USER_POOL_ID: "ap-southeast-2_k4w7p7jeJ",
  APP_CLIENT_ID: "skh2onnato7ujopj3to0nikn5",
  IDENTITY_POOL_ID: "ap-southeast-2:3d73691f-a115-41ab-9eb5-e0fed7022e4a", // get aws temp credentials
  TEST_USER_NAME: "xanhtham.cuc2",
  TEST_USER_PASSWORD: "Pussles123!",
  SPACES_PHOTOS_BUCKET: "spaces-photos-06b363124e12", //s3 bucket
  api: {
    baseUrl: spacesUrl,
    spacesUrl: `${spacesUrl}spaces`, 
  },
};
