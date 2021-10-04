import styled from "styled-components";
import {
  space,
  position,
  layout,
  typography,
  flexbox,
  grid,
  color,
  compose,
} from "styled-system";

export const Form = styled.form.attrs({
  className: "p-formgrid p-fluid",
})`
  ${compose(space, position, layout, typography, flexbox, grid, color)}
  padding:20px;
  box-shadow: ${({ shadow }) =>
    shadow
      ? "-4px -4px 12px var(--shadow), 4px 4px 12px var(--shadow)"
      : "none"};
  @media (max-width: 40em) {
    display: flex;
    flex-direction: column;
    align-items: normal;
  }
`;

export default Form;
