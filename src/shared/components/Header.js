import { Logo } from "./Logo";
import { SignIn, PrimaryOutlinedButton, SecondaryButton } from "./Button";
import styled from "styled-components";
import { space, position, layout, typography, flexbox } from "styled-system";
import logo from "../../logo.svg";
import { GoogleIcon } from "./Icon";
import { Span } from "./Span";
import { Link } from "react-router-dom";

const StyledHeader = styled("header").attrs({
  className: "delivre-header",
})(space, position, layout, typography, flexbox);

const CommonHeader = ({ children }) => (
  <StyledHeader
    display="flex"
    alignItems="center"
    alignContent="center"
    justifyContent="space-between"
    position="relative"
  >
    {children}
  </StyledHeader>
);

export const Header = ({ isLoggedIn, handleOnClick, userName }) =>
  isLoggedIn ? (
    <LoginHeader userName={userName} />
  ) : (
    <LogoutHeader handleOnClick={handleOnClick} />
  );

const LoginHeader = ({ userName }) => (
  <CommonHeader>
    <Link to={"/"}>
      <Logo logo={logo} />
    </Link>
    <Span display='flex' alignItems='center' height='10vh'>
      <Link to={"/order"}>
        <SecondaryButton
          mr={10}
          p={[2, 3]}
          fontSize={[10, 12]}
          width={[1, "auto"]}
          radius="15"
          label="Order Delivery"
        />
      </Link>

      <Link to={"/travel"}>
        <PrimaryOutlinedButton
          mr={10}
          p={[2, 3]}
          fontSize={[10, 12]}
          width={[1, "auto"]}
          radius="15"
          label="Travel Plan"
        />
      </Link>
      <Link to={"/order-list"}>
        <PrimaryOutlinedButton
          p={[2, 3]}
          fontSize={[10, 12]}
          width={[1, "auto"]}
          radius="15"
          label={userName}
        />
      </Link>
    </Span>
  </CommonHeader>
);

const LogoutHeader = ({ handleOnClick }) => (
  <CommonHeader>
    <Logo logo={logo} />
    <SignIn
      m={[1, 2, 3, 4]}
      p={3}
      width={["200px", "300px"]}
      radius="15"
      label="Sign In With Google"
      icon={<GoogleIcon color="red" />}
      onClick={handleOnClick}
    />
  </CommonHeader>
);
