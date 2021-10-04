import { SpeedDial as Speeddial } from "primereact/speeddial";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const SpeedDial = styled(Speeddial).attrs({
  className: "p-speeddial p-speeddial-direction-left",
})`
  ${compose(space, position, layout, typography)}
  display: none;
  right:20px;
  top: calc(45% - 2rem);

  .p-button:not(a):not(.p-disabled) {
    background: var(--secondary);
    color: #ffffff;
    border-color: var(--secondary)
}
  .p-speeddial-button.p-button.p-button-icon-only {
    width: 3rem;
    height: 3rem;
}
  @media screen and (max-width: 485px) {
    display: flex;
  }
`;
