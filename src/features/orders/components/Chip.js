import { TextButton } from "../../../shared/components/Button";
import { Label } from "../../../shared/components/Label";

export const Chip = ({ name, onClick, value, chipName }) => (
  <TextButton mr={[2,4]} id={name} name={name} size="medium" weight="medium" color="var(--primary)" onClick={onClick}>
    {chipName}
  </TextButton>
);
