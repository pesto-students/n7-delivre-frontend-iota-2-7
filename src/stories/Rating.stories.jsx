import React from "react";
import { Rating } from "../components/shared/Rating";

export default {
  title: "Components/Rating",
};

export const RatingDefault = () => (
  <Rating stars={5} value={4} cancel={false} />
);
