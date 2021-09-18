import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

const Image = styled.img`
  ${compose(space, position, layout, typography)}
`;

export const Logo = ({ logo }) => (
  <Image m={[1, 2, 3, 4]} src={logo} alt="Logo" />
);
