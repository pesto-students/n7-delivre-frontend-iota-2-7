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

export const Container = styled.div`
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

  box-shadow: ${({ shadow }) =>
    shadow
      ? "-4px -4px 12px var(--shadow), 4px 4px 12px var(--shadow)"
      : "none"};
  @media (min-width: 1200px) {
    max-width: 1164px;
    margin: 0 auto;
  }
`;
