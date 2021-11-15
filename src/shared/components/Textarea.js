import { InputTextarea as DTextarea} from 'primereact/inputtextarea';
import styled from 'styled-components';
import { compose, space, position, layout, typography } from "styled-system";

export const InputTextArea = styled(DTextarea)`
  ${compose(space, position, layout, typography)}
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