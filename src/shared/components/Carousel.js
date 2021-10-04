import { Carousel as DCarousel } from "primereact/carousel";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const Carousel = styled(DCarousel)`
  ${compose(space, position, layout, typography)}
`;
