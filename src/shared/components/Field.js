import styled from "styled-components";
import {
  space,
  position,
  layout,
  typography,
  flexbox,
  grid,
  color,
} from "styled-system";

export const Field = styled.div.attrs({
  className: "p-field",
})(layout, position, typography, space, color, flexbox, grid);

export default Field;
