import { SelectBox } from "../components/shared/SelectBox";
import React from "react";

export default {
  title: "Components/Select",
};

const options = [
  { label: "Upto 1 kg", value: "1" },
  { label: "Upto 5 kg", value: "5" },
  { label: "Upto 10 kg", value: "10" },
  { label: "Upto 15 kg", value: "15" },
  { label: "Upto 20 kg", value: "20" },
];

export const SelectInputBox = () => (
  <SelectBox value="1" options={options} onChange={(e) => {}} />
);
