import React from "react";
import { BasicCheckboxInput } from "../components/shared/Checkbox";

export default {
  title: "Components/Checkbox",
};

export const CheckedCheckboxInput = () => (
  <BasicCheckboxInput checked="true" inputId="checked"></BasicCheckboxInput>
);

export const UncheckedCheckboxInput = () => (
  <BasicCheckboxInput inputId="unchecked"></BasicCheckboxInput>
);

export const DisabledCheckboxInput = () => (
  <BasicCheckboxInput inputId="disabled" disabled></BasicCheckboxInput>
);
