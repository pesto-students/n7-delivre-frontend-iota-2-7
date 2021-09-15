import {
  BasicInputText,
  BasicInvalidInput,
  IconInputText,
} from "../components/shared/Input";
import React from "react";
import { SearchIcon } from "../components/shared/Icon";

export default {
  title: "Components/Input",
};

export const BasicInput = () => (
  <BasicInputText placeholder="type anything.." />
);

export const DisabledInput = () => (
  <BasicInputText placeholder="type anything.." disabled />
);

export const InvalidInput = () => (
  <BasicInvalidInput placeholder="type anything.." />
);

export const IconInput = () => (
  <IconInputText>
    <SearchIcon />
    <BasicInputText placeholder="type anything.." />
  </IconInputText>
);
