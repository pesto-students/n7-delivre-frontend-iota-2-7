import React from "react";
import { BasicRating } from "../components/shared/Rating";

export default {
  title: "Components/Rating",
};

export const Rating = () => <BasicRating stars={5} value={4} cancel={false} />;
