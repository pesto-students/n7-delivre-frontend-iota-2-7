import { Dialog as DDialog } from "primereact/dialog";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const Dialog = styled(DDialog)`
  ${compose(space, position, layout, typography)}
`;
