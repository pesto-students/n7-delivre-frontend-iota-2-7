import { Timeline as DTimeline } from "primereact/timeline";
import styled from "styled-components";
import { compose, space, layout, position, typography } from "styled-system";

export const Timeline = styled(DTimeline).attrs({
  className: "p-timeline p-timeline-horizontal",
})`
  ${compose(space, layout, position, typography)}

  .p-timeline-event-separator {
    .p-timeline-event-connector {
      height: 4px;
    }
  }

  .p-timeline-event-connector {
    background-color: var(--primary);
  }
`;
