import { Dialog } from "primereact/dialog";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const BasicDialog = styled(Dialog)`
  ${compose(space, position, layout, typography)}
`;
