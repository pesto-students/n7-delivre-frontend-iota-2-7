import React from "react";
import { Card } from "../../../shared/components/Card";
import { Div } from "../../../shared/components/Div";
import { RupeeIcon } from "../../../shared/components/Icon";
import { Label } from "../../../shared/components/Label";
import { Span } from "../../../shared/components/Span";


const footer = (
    <Label>
      from{" "}
      <Span>
        <RupeeIcon />
      </Span>{" "}
      39{" "}
    </Label>
  );

function DeliverySchedule() {
  return (
    <Div
      padding={20}
      mt={20}
      borderRadius={5}
      shadow
      display="flex"
    >
      <Card title="Deliver Now" footer={footer} width={[1, 1/2, 1/3, 1/4]}>
        <p>
          We will assign the nearest courier to pick-up and deliver as soon as
          possible.
        </p>
      </Card>

      <Card title="Schedule" footer={footer} width={[1, 1/2, 1/3,1/4]}>
        <p>We will arrive at each address at specified times.</p>
      </Card>
    </Div>
  );
}

export default DeliverySchedule;
