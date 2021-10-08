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

export const Header = ({
  isLoggedIn,
  handleOnClick,
  handleGuestLogin,
  userName,
}) =>
  isLoggedIn ? (
    <LoginHeader userName={userName} />
  ) : (
    <LogoutHeader
      handleOnClick={handleOnClick}
      handleGuestLogin={handleGuestLogin}
    />
  );

const LoginHeader = ({ userName }) => (
  <CommonHeader>
    <Link to={"/"}>
      <Logo logo={logo} pt={26} />
    </Link>
    <Span mt={16} mr={[0, 4]} display="flex" alignItems="center">
      <Link to={"/order"}>
        <SecondaryButton mr={10} p={[2, 3]} width={[1, "auto"]} radius="15">
          <Span>Order Delivery</Span>
        </SecondaryButton>
      </Link>

      <Link to={"/travel"}>
        <PrimaryOutlinedButton
          mr={10}
          p={[2, 3]}
          width={[1, "auto"]}
          radius="15"
        >
          <Span>Travel Plan</Span>
        </PrimaryOutlinedButton>
      </Link>
      <Link to={"/order-list"}>
        <PrimaryOutlinedButton
          p={[2, 3]}
          width={[1, "auto"]}
          radius="15"
        >
          <Span>{userName}</Span>
        </PrimaryOutlinedButton>
      </Link>
    </Span>
  </CommonHeader>
);

const LogoutHeader = ({ handleOnClick, handleGuestLogin }) => (
  <CommonHeader>
    <Link to={"/"}>
      <Logo logo={logo} pt={26} />
    </Link>
    <Span mt={16} mr={[0, 4]} display="flex" alignItems="center">
      <Link to={""}>
        <SignIn mr={10} p={[2, 3]} radius="15" onClick={handleOnClick}>
          <GoogleIcon color="red" />
          <Span ml={2}>Google Sign In</Span>
        </SignIn>
      </Link>
      <Link to={""}>
        <PrimaryOutlinedButton
          p={[2, 3]}
          width={[1, "auto"]}
          radius="15"
          onClick={handleGuestLogin}
        >
          <Span>Guest Sign In</Span>
        </PrimaryOutlinedButton>
      </Link>
    </Span>
  </CommonHeader>
);
