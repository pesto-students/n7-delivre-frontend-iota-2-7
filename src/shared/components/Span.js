import styled from "styled-components";
import {
  compose,
  layout,
  position,
  typography,
  space,
  color,
  flexbox,
  grid
} from "styled-system";

export const Span = styled.span`
  ${compose(space, position, layout, typography, color,flexbox, grid)}
`;
