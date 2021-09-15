import React from "react";
// import { faGoogle as google} from '@fortawesome/free-brands-svg-icons';
import { google } from "../components/shared/IconsAll";
import {
  PrimaryButton,
  SignInGoogleButton,
  SecondaryButton,
  PrimaryOutlinedButton,
  TextButton,
} from "../components/shared/Button";
import { GoogleIcon } from "../components/shared/Icon";

export default {
  title: "Components/Button",
};

export const SignIn = () => (
  <SignInGoogleButton
    m={[1, 1 / 2]}
    p={3}
    width={["100px", "200px", "300px"]}
    label="Sign In With Google"
    icon={<GoogleIcon color="red" />}
  />
);

export const Primary = () => (
  <PrimaryButton
    m={[1, 1 / 2]}
    p={3}
    width={["200px", "300px"]}
    label="Primary"
  />
);

export const Secondary = () => (
  <SecondaryButton
    m={[1, 1 / 2]}
    p={3}
    width={["200px", "300px"]}
    label="Secondary"
  />
);

export const PrimaryOutlined = () => (
  <PrimaryOutlinedButton
    m={[1, 1 / 2]}
    p={3}
    width={["200px", "300px"]}
    label="Primary Outlined"
  />
);

export const Text = () => (
  <TextButton
    m={[1, 1 / 2]}
    p={3}
    width={["100px", "200px"]}
    height={1}
    label="Text"
  />
);
