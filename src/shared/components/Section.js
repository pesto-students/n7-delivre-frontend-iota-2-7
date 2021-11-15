import styled from "styled-components";
import {
  compose,
  layout,
  position,
  typography,
  space,
  color,
  shadow,
  border,
  flexbox,
} from "styled-system";

export const Section = styled.section`
  ${compose(
    space,
    position,
    layout,
    typography,
    color,
    shadow,
    border,
    flexbox
  )}
  min-height:100vh;
  box-shadow: ${({ shadow }) =>
    shadow
      ? "-4px -4px 12px var(--shadow), 4px 4px 12px var(--shadow)"
      : "none"}
`;
