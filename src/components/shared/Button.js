import styled from "styled-components";
import { Button } from "primereact/button";
import { compose, space, position, layout, typography } from "styled-system";

export const StyledPrimaryButton = styled(Button).attrs({
  className: "p-button-rounded",
})(space, position, layout, typography);

export const StyledPrimaryButtonOutlined = styled(StyledPrimaryButton).attrs({
  className: "p-button-outlined",
})(space, position, layout, typography);

export const StyledPrimaryButtonRaised = styled(StyledPrimaryButton).attrs({
  className: "p-button-raised",
})(space, position, layout, typography);

export const SignIn = styled(StyledPrimaryButtonRaised)`
  ${compose(space, position, layout, typography)}
  background: var(--white);
  color: var(--black);
  border: 1px solid var(--white);
`;

export const PrimaryButton = styled(StyledPrimaryButton)`
  ${compose(space, position, layout, typography)}
  background: var(--${(props) => props.background || "primary"});
  color: var(--white);
  font-weight: var(--bold-weight)";
  border: 1px solid var(--white);
  .p-button-label {
    font-size: var(--small);
  }
  :not(a):not(.p-disabled):hover {
    background: var(--${(props) => props.background || "primary"});
    color: var(--white);
    border: 1px solid var(--white);
  }
`;

export const SecondaryButton = styled(StyledPrimaryButtonRaised)`
  ${compose(space, position, layout, typography)}
  background: var(--secondary);
  color: var(--black-600);
  border: 1px solid var(--secondary);
  .p-button-label {
    font-size: var(--small);
  }
  :not(a):not(.p-disabled):hover {
    background: var(--secondary);
    color: var(--black-600);
    border: 1px solid var(--secondary);
  }
`;
export const PrimaryOutlinedButton = styled(StyledPrimaryButtonRaised)`
  ${compose(space, position, layout, typography)}
  background: var(--white);
  color: var(--black-600);
  border: 1px solid var(--black-600);
  .p-button-label {
    font-size: var(--small);
  }
  :not(a):not(.p-disabled):hover {
    background: var(--white);
    color: var(--black-600);
    border: 1px solid var(--black-600);
  }
`;

export const TextButton = styled(StyledPrimaryButtonRaised)`
  ${compose(space, position, layout, typography)}
  background: var(--white);
  color: var(--primary);
  border: 1px solid var(--white);
  .p-button-label {
    font-size: var(--small);
  }
  :not(a):not(.p-disabled):hover {
    background: var(--white);
    color: var(--primary);
    border: 1px solid var(--white);
  }
`;

export const PrimaryButtonIcon = styled(PrimaryButton)`
  ${compose(space, position, layout, typography)}
  ${({ breakpoints }) =>
    breakpoints &&
    `@media ${breakpoints.mobile} {
        display: flex;
        justify-content: center;
        .p-button-label {
          flex: none;
        }
    }`}
`;
