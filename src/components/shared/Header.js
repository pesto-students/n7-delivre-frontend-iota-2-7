import { Logo } from "./Logo";
import {
  SignInGoogleButton,
  PrimaryOutlinedButton,
  SecondaryButton,
} from "./Button";
import styled from "styled-components";
import { space, position, layout, typography, flexbox } from "styled-system";
import logo from "../../logo.svg";
import { GoogleIcon } from "./Icon";

const StyledHeader = styled("header").attrs({
  className: "delivre-header",
})(space, position, layout, typography, flexbox);

const CommonHeader = ({ children }) => (
  <StyledHeader display="flex" flex="1 1 auto" justifyContent="between">
    {children}
  </StyledHeader>
);

export const LoginHeader = () => (
  <CommonHeader>
    <Logo logo={logo} />
    <SecondaryButton
      m={[1, 1 / 2]}
      p={3}
      width={["200px", "300px"]}
      label="Secondary"
    />

    <PrimaryOutlinedButton
      m={[1, 1 / 2]}
      p={3}
      width={["200px", "300px"]}
      label="Primary Outlined"
    />
  </CommonHeader>
);

export const LogoutHeader = () => (
  <CommonHeader>
    <Logo logo={logo} />
    <SignInGoogleButton
      m={[1, 2, 3, 4]}
      p={3}
      width={["100px", "200px", "300px"]}
      label="Sign In With Google"
      icon={<GoogleIcon color="red" />}
    />
  </CommonHeader>
);
