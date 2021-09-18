import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";
import { Checkbox as DCheckbox } from "primereact/checkbox";

export const Checkbox = styled(DCheckbox).attrs({
  className: "p-checkbox",
})`
  ${compose(space, position, layout, typography)}
  .p-checkbox-box.p-highlight {
    border-color: var(--primary);
    background: var(--primary);
  }
`;
