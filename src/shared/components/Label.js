import styled from "styled-components";
import {
  space,
  position,
  layout,
  typography,
  color,
  variant,
  flexbox
} from "styled-system";

export const Label = styled("label")(
  variant({
    prop: "size",
    variants: {
      big: {
        fontSize: 4,
      },
      medium: {
        fontSize: 2,
      },
      small: {
        fontSize: 1,
      },
    },
  }),
  variant({
    prop: "weight",
    variants: {
      xbold:{
        fontWeight: "var(--xbold-weight)"
      },
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
  variant({
    prop: "color",
    variants: {
      error: {
        color: "var(--red)",
      },
      warning: {
        fontWeight: "var(--yellow)",
      },
      success: {
        fontWeight: "var(--primary)",
      },
    },
  }),
  space,
  position,
  layout,
  typography,
  color,
  flexbox
);
