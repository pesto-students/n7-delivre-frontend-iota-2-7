import { Rating } from "primereact/rating";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const StyledRating = styled(Rating).attrs({ className: "p-rating" })(
  space,
  position,
  layout,
  typography
);

export const BasicRating = styled(StyledRating)`
  ${compose(space, position, layout, typography)}
  .p-rating-icon.pi-star {
    color: var(--secondary);
  }
`;
