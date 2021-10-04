import { Card as DCard } from "primereact/card";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const Card = styled(DCard)`
  ${compose(space, position, layout, typography)}
  box-shadow: 0 0 0 0.3rem var(--tertiary);
`;
