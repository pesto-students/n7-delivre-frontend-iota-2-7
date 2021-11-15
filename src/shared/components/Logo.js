import { Image } from './Image';

export const Logo = ({ logo, ...props }) => (
  <Image  {...props} m={[1, 2, 3, 4]} src={logo} alt="Logo" />
);
