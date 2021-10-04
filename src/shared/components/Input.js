import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";
import { InputText as DInputText } from "primereact/inputtext";

export const InputText = styled(DInputText)`
  ${compose(space, position, layout, typography)}
  border: ${({border}) => border ? '1px solid var(--border)' : 'none'};
  border-radius: var(--mini);
  :enabled:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 0.2rem var(--tertiary);
    border-color: var(--secondary);
  }
  :enabled:hover {
    border-color: var(--secondary);
  }
`;

export const InvalidInput = styled(InputText).attrs({
  className: "p-invalid",
})(space, position, layout, typography);

const StyledIconInputText = styled.span.attrs({
  className: "p-input-icon-left",
})(space, position, layout, typography);

export const IconInputText = ({ children }) => (
  <StyledIconInputText>{children}</StyledIconInputText>
);
