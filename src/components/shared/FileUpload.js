import { FileUpload } from "primereact/fileupload";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const StyledFileUpload = styled(FileUpload)`
  ${compose(space, position, layout, typography)}
  .p-button {
    background: var(--primary);
    color: var(--white);
    border: 1px solid var(--white);
    .p-button-label {
      font-size: var(--small);
    }
    :not(a):not(.p-disabled):hover {
      background: var(--primary);
      color: var(--white);
      border: 1px solid var(--white);
    }
  }
`;
