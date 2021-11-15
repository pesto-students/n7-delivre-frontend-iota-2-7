import {
  InputText,
  InvalidInput,
  IconInputText,
} from "../shared/components/Input";
import React from "react";
import { SearchIcon } from "../shared/components/Icon";

export default {
  title: "Components/Input",
};

export const BasicInput = () => <InputText placeholder="type anything.." />;

export const DisabledInput = () => (
  <InputText placeholder="type anything.." disabled />
);

export const InvalidInputDefault = () => (
  <InvalidInput placeholder="type anything.." />
);

export const IconInput = () => (
  <IconInputText>
    <SearchIcon />
    <InputText placeholder="type anything.." border/>
  </IconInputText>
);
