import React from "react";
import { BasicDropdown } from "../components/shared/Dropdown";

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

export const Dropdown = () => (
  <BasicDropdown
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
  <BasicDropdown
    value={cities[0]}
    options={cities}
    optionLabel="name"
    filter
    showClear
    filterBy="name"
    placeholder="Select a City"
  />
);
