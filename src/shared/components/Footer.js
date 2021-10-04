import styled from "styled-components";
import {
  compose,
  layout,
  position,
  typography,
  space,
  color,
  flexbox,
  grid
} from "styled-system";
import { Div } from "./Div";
import { FacebookIcon, InstaIcon, YoutubeIcon } from "./Icon";
import { Label } from "./Label";

export const StyledFooter = styled.footer`
  ${compose(space, position, layout, typography, color, flexbox,grid)}
  width: 100%;
  height: 150px;
  box-shadow: -8px -6px 12px rgba(196, 196, 196, 0.25);
`;

export const Footer = () => (
  <StyledFooter display="grid" gridTemplateColumns='1fr 2fr'>
    <Div display='flex' justifyContent='center' alignItems='center'>
      <FacebookIcon />
      <InstaIcon />
      <YoutubeIcon />
    </Div>
    <Label alignSelf='center'>© 2021–2022 Delivre. All Rights reserved.</Label>
  </StyledFooter>
);
