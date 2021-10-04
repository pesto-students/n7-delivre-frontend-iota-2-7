import React from "react";
import { Container } from "../components/shared/Container";

export default {
  title: "Components/Conatiner",
};

export const ContainerDefault = () => (
  <Container
    width={[1, 1 / 2]}
    height={"100px"}
    backgroundColor="var(--secondary)"
  />
);
