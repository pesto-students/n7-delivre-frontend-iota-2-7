import { Card as DCard } from "primereact/card";
import styled from "styled-components";
import { compose, space, position, layout, typography } from "styled-system";

export const Card = styled(DCard)`
  ${compose(space, position, layout, typography)}
  margin: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;
