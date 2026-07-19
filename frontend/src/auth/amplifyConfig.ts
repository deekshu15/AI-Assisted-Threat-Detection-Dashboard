import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_6nuYALeom",
      userPoolClientId: "7ib6rc20jau9d95e6togmbhu2v",
      loginWith: {
        email: true,
      },
    },
  },
});