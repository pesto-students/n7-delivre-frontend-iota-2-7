import { Carousel } from "primereact/carousel";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const BasicCarousel = styled(Carousel)`
  ${compose(space, position, layout, typography)}
`;
