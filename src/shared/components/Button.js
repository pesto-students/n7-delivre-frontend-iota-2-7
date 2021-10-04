import styled from "styled-components";
import { Button } from "primereact/button";
import { compose, space, position, layout, typography } from "styled-system";

export const StyledPrimaryButton = styled(Button).attrs({
  className: "p-button",
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
  font-weight: var(--bold-weight);
  border-radius: ${({radius}) => radius ? radius : "0"}px;
  .p-button-label {
    font-size: var(--small);
  }
`;

export const PrimaryButton = styled(StyledPrimaryButton)`
  ${compose(space, position, layout, typography)}
  background: var(--${({background}) => background ? background : "primary"});
  color: var(--white);
  font-weight: var(--bold-weight);
  border: 1px solid var(--white);
  border-radius: ${({radius}) => radius ? radius : "0"}px;
  .p-button-label {
    font-size: var(--small);
  }
  :not(a):not(.p-disabled):hover {
    background: var(--${({background}) => background ? background : "primary"});
    color: var(--white);
    border: 1px solid var(--white);
  }
  @media (max-width:40em){
    border: none;
    border-radius: 0px;
  }
`;

export const SecondaryButton = styled(StyledPrimaryButtonRaised)`
  ${compose(space, position, layout, typography)}
  background: var(--secondary);
  color: var(--black);
  font-weight: var(--xbold-weight);
  border: 1px solid var(--secondary);
  border-radius: ${({radius}) => radius ? radius : "0"}px;
  .p-button-label {
    font-size: var(--small);
  }
  :not(a):not(.p-disabled):hover {
    background: var(--secondary);
    color: var(--black-600);
    border: 1px solid var(--secondary);
  }
  @media (max-width:40em){
    border: none;
    border-radius: 0px;
  }
`;
export const PrimaryOutlinedButton = styled(StyledPrimaryButtonRaised)`
  ${compose(space, position, layout, typography)}
  background: var(--white);
  color: var(--black);
  font-weight: var(--xbold-weight);
  border: 1px solid ${(props) => props.border ? `var(--${props.border})`: 'var(--black-600)'};
  border-radius: ${({radius}) => radius ? radius : "0"}px;
  .p-button-label {
    font-size: var(--small);
  }
  :not(a):not(.p-disabled):hover {
    background: var(--white);
    color: var(--black-600);
    border: 1px solid var(--black-600);
  }
  @media (max-width:40em){
    border: none;
    border-radius: 0px;
  }
`;

export const TextButton = styled(StyledPrimaryButtonRaised)`
  ${compose(space, position, layout, typography)}
  background: var(--white);
  font-weight: var(--xbold-weight);
  color: ${(props) => props.border ? `var(--${props.border})`: 'var(--primary)'};
  border: 2px solid ${(props) => props.border ? `var(--${props.border})`: 'var(--white)'};
  border-radius: ${({radius}) => radius ? radius : "0"}px;
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
