import styled from "styled-components";
import {
  compose,
  layout,
  position,
  typography,
  space,
  color,
} from "styled-system";

export const Div = styled.div`
  ${compose(space, position, layout, typography, color)}
`;
