import React from "react";
import { Dropdown } from "../shared/components/Dropdown";

export default {
  title: "Components/Dropdown",
};

const cities = [
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
];

export const DropdownDefault = () => (
  <Dropdown
    value=""
    options={cities}
    optionLabel="name"
    filter
    showClear
    filterBy="name"
    placeholder="Select a City"
  />
);

export const DropdownSelected = () => (
  <Dropdown
    value={cities[0]}
    options={cities}
    optionLabel="name"
    filter
    showClear
    filterBy="name"
    placeholder="Select a City"
  />
);
