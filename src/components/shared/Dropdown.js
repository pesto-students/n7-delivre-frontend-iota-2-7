import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

import { Dropdown } from "primereact/dropdown";

export const BasicDropdown = styled(Dropdown).attrs({
  className: "p-dropdown",
})`
  ${compose(space, position, layout, typography)}
  :not(.p-disabled):hover {
    border-color: var(--secondary);
  }
  :not(.p-disabled).p-focus {
    box-shadow: 0 0 0 0.2rem var(--secondary);

    border-color: var(--secondary);
  }
`;
