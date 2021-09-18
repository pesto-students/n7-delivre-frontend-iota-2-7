import { Rating as DRating } from "primereact/rating";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

const StyledRating = styled(DRating).attrs({ className: "p-rating" })`
  ${compose(space, position, layout, typography)}
  .p-rating-icon.pi-star {
    color: var(--secondary);
  }
`;

export const Rating = (props) => <StyledRating {...props} />;
