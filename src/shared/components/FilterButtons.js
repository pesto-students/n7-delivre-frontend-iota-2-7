import React from "react";
import { TextButton } from "./Button";
import { Span } from "./Span";

export default function FilterButtons({ textButtons, handler }) {
  return (
    <Span className='filter-buttons'>
      {textButtons.map((btn) => (
        <TextButton
          key={btn.label}
          mr={4}
          p={3}
          width={[1, "auto"]}
          height={1}
          label={btn.label}
          onClick={() => handler(btn.filterValue)}
        />
      ))}
    </Span>
  );
}

