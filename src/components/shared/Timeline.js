import { Timeline as DTimeline } from "primereact/timeline";
import styled from "styled-components";
import { compose, space, layout, position, typography } from "styled-system";

export const Timeline = styled(DTimeline).attrs({
  className: "customized-timeline",
})`
  ${compose(space, layout, position, typography)}
`;
