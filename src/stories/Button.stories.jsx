import React from "react";

import {
  PrimaryButton,
  SignIn,
  SecondaryButton,
  PrimaryOutlinedButton,
  TextButton,
} from "../shared/components/Button";
import { GoogleIcon } from "../shared/components/Icon";

export default {
  title: "Components/Button",
};

export const SignInButton = () => (
  <SignIn
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
