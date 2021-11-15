import React from "react";
import { Checkbox } from "../shared/components/Checkbox";

export default {
  title: "Components/Checkbox",
};

export const CheckedCheckboxInput = () => (
  <Checkbox checked="true" inputId="checked"></Checkbox>
);

export const UncheckedCheckboxInput = () => (
  <Checkbox inputId="unchecked"></Checkbox>
);

export const DisabledCheckboxInput = () => (
  <Checkbox inputId="disabled" disabled></Checkbox>
);
