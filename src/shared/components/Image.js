import styled from "styled-components";
import { compose, space, position, layout, typography , flexbox} from "styled-system";

export const Image = styled.img`
  ${compose(space, position, layout, typography, flexbox)}
`;
