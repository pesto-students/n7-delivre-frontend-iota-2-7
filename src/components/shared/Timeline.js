import { Timeline } from "primereact/timeline";
import styled from "styled-components";
import { compose, space, layout, position, typography } from "styled-system";

export const BasicTimeline = styled(Timeline).attrs({
  className: "customized-timeline",
})`
  ${compose(space, layout, position, typography)}
`;
