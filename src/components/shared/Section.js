import styled from "styled-components";
import {
  compose,
  layout,
  position,
  typography,
  space,
  color,
} from "styled-system";

export const Section = styled.section`
  ${compose(space, position, layout, typography, color)}
`;
