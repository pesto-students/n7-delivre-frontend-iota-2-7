import styled from "styled-components";
import {
  space,
  position,
  layout,
  typography,
  color,
  variant,
} from "styled-system";

export const Label = styled("label")(
  variant({
    prop: "size",
    variants: {
      big: {
        fontSize: 4,
        lineHeight: "heading",
      },
      small: {
        fontSize: 1,
        lineHeight: "body",
      },
    },
  }),
  space,
  position,
  layout,
  typography,
  color
);
