import { SelectButton } from "primereact/selectbutton";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const SelectBox = styled(SelectButton).attrs({
  className: "p-selectbutton p-buttonset",
})`
  ${compose(space, position, layout, typography)}
  .p-button:not(:last-child) {
    border-right: 4px solid var(--secondary);
    margin-right: 4px;
  }
  .p-button {
    width: ${({ large }) => (large ? "150px" : "inherit")};
    height: ${({ large }) => (large ? "75px" : "inherit")};
    border-right: 4px solid var(--secondary);
    margin-right: 4px;
  }
  .p-button.p-highlight {
    background: var(--primary);
    border-color: var(--primary);
  }
  .p-button.p-highlight:hover {
    background: var(--primary);
    border-color: var(--primary);
  }
  @media screen and (max-width: 40em) {
    .p-button {
      width: 100%;
      height: 100%;
    }
    display: flex;
    flex-direction: column;
  }
`;
