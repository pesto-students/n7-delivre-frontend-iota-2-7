import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";
import { Checkbox } from "primereact/checkbox";

export const BasicCheckboxInput = styled(Checkbox).attrs({
  className: "p-checkbox",
})`
  ${compose(space, position, layout, typography)}
  .p-checkbox-box.p-highlight {
    border-color: var(--primary);
    background: var(--primary);
  }
`;
