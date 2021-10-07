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
import { Span } from "./Span";

export const StyledFooter = styled.footer`
  ${compose(space, position, layout, typography, color, flexbox,grid)}
  width: 100%;
  height: auto;
  box-shadow: -8px -6px 12px rgba(196, 196, 196, 0.25);
`;

export const Footer = () => (
  <StyledFooter display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
    <Span mt={3}>
      <Span mr={3}> <FacebookIcon/></Span>
      <Span mr={3}> <InstaIcon/></Span>
      <Span mr={3}> <YoutubeIcon/></Span>
    </Span>
    <Div><Label textAlign='center'>© 2021–2022 Delivre. All Rights reserved.</Label></Div>
  </StyledFooter>
);
