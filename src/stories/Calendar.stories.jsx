import React from "react";
import { BasicCalendarInput } from "../components/shared/Calendar";

export default {
  title: "Components/Calendar",
};

export const CalendarWithTime = () => (
  <BasicCalendarInput showTime showSeconds showButtonBar showIcon />
);
