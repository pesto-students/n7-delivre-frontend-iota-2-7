import React from "react";
import { CircleIcon } from "../shared/components/Icon";
import { Span } from "../shared/components/Span";
import { Timeline } from "../shared/components/Timeline";

export default {
  title: "Components/Timeline",
};

const events = ["Ordered", "Picked", "On Route", "Delivered"];

const customizedMarker = () => {
  return (
    <Span>
      <CircleIcon color="var(--secondary)" size="3x" />
    </Span>
  );
};

export const TimelineDefault = () => (
  <Timeline
    layout="horizontal"
    value={events}
    align="top"
    marker={customizedMarker}
    content={(item) => item}
  />
);
