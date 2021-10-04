import styled from "styled-components";
import {
  variant,
  layout,
  position,
  typography,
  space,
  color,
} from "styled-system";

export const Heading = styled.h1(
variant({
    prop: "size",
    variants: {
      big: {
        fontSize: 5,
      },
      medium: {
        fontSize: 4,
      },
      small: {
        fontSize: 2,
      },
    },
  }),
  variant({
    prop: "weight",
    variants: {
      bold: {
        fontWeight: "var(--bold-weight)",
      },
      medium: {
        fontWeight: "var(--medium-weight)",
      },
      hairline: {
        fontWeight: "var(--hairline-weight)",
      },
    },
  }),
  space,
  position,
  layout,
  typography,
  color
)
