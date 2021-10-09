import { TextButton } from "../../../shared/components/Button";


/**
 * Renders Chip Component
 * @param {String} name - unique id of the chip
 * @param {Function} onClick - chip on click handler
 * @param {String} chipName - name of the chip
 * @returns {JSX} Text button with handler
 */
export const Chip = ({ name, onClick, chipName }) => (
  <TextButton mr={[2,4]} id={name} name={name} size="medium" weight="medium" color="var(--primary)" onClick={onClick}>
    {chipName}
  </TextButton>
);
