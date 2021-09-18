import { Calendar as DCalendar } from "primereact/calendar";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const Calendar = styled(DCalendar)`
  ${compose(space, position, layout, typography)}
  .p-button {
    background: var(--primary);
    border: 1px solid var(--primary);
    :not(a):not(.p-disabled):hover {
      background: var(--primary);
      border: 1px solid var(--primary);
    }
  }
`;
