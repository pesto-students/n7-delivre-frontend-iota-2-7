import styled from "styled-components";
import {
  compose,
  layout,
  position,
  typography,
  space,
  color,
} from "styled-system";

export const Span = styled.span`
  ${compose(space, position, layout, typography, color)}
`;
