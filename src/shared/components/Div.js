import styled from "styled-components";
import {
  space,
  position,
  layout,
  typography,
  color,
  shadow,
  border,
  flexbox,
  compose,
  grid,
} from "styled-system";

export const Div = styled.div`
  ${compose(
    layout,
    position,
    typography,
    space,
    color,
    shadow,
    border,
    flexbox,
    grid
  )}
  padding:10px;
  box-shadow: ${({ shadow }) =>
    shadow
      ? "-4px -4px 12px var(--shadow), 4px 4px 12px var(--shadow)"
      : "none"};
  
`;
