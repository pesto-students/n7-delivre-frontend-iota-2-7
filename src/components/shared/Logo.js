import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";
import logo from "../../logo.svg";

const StyledImage = styled.img`
  ${compose(space, position, layout, typography)}
`;

export const Logo = () => (
  <StyledImage m={[1, 2, 3, 4]} src={logo} alt="Logo" />
);
