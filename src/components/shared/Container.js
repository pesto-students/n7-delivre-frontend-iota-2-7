import styled from "styled-components";
import {
  compose,
  layout,
  position,
  typography,
  space,
  color,
} from "styled-system";

export const Container = styled.div`
  ${compose(space, position, layout, typography, color)}
  margin: 0px auto;
`;
