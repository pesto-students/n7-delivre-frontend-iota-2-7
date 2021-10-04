import { Heading } from "./Heading";
import { SelectBox } from "./SelectBox";


const options = [
    { label: "Upto 1 kg", value: "1" },
    { label: "Upto 5 kg", value: "5" },
    { label: "Upto 10 kg", value: "10" },
    { label: "Upto 15 kg", value: "15" },
    { label: "Upto 20 kg", value: "20" },
  ];
  
export const Weight = ({value, onChange, id, name, onBlur}) => (
  <>
      <Heading size="small">Weight</Heading>
      <SelectBox id={id} name={name} value={value} options={options} onChange={onChange} mt={10} onBlur={onBlur} />
  </>
);
