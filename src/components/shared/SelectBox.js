import { SelectButton } from "primereact/selectbutton";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const SelectBox = styled(SelectButton).attrs({
  className: "p-selectbutton",
})`
  ${compose(space, position, layout, typography)}
  .p-button.p-highlight {
    background: var(--primary);
    border-color: var(--primary);
  }
`;
