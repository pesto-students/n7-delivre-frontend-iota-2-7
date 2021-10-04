import { Skeleton as DSkeleton } from "primereact/skeleton";
import styled from "styled-components";
import { position, space, layout } from "styled-system";

export const Skeleton = styled(DSkeleton).attrs({
  className: "p-skeleton",
})(space, position, layout);
