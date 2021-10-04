import React from "react";
import { Calendar } from "../components/shared/Calendar";

export default {
  title: "Components/Calendar",
};

export const CalendarWithTime = () => (
  <Calendar showTime showSeconds showButtonBar showIcon />
);
