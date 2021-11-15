import React from "react";
import { Card } from "../../../shared/components/Card";
import { Div } from "../../../shared/components/Div";
import { RupeeIcon } from "../../../shared/components/Icon";
import { Label } from "../../../shared/components/Label";
import { Span } from "../../../shared/components/Span";



/** Render Schedule option in Order Form
 * @returns JSX element
 */
const DeliverySchedule = () => {

  const footer = (
    <Label>
      from{" "}
      <Span>
        <RupeeIcon />
      </Span>{" "}
      39{" "}
    </Label>
  );

  return (
    <Div
      padding={20}
      mt={20}
      borderRadius={5}
      shadow
      display="flex"
      flexWrap="wrap"
    >
      <Card
        title="Deliver Now"
        footer={footer}
        width={[1, 1 / 2, 1 / 3, 1 / 4]}
      >
        <Label>
          We will assign the nearest courier to pick-up and deliver as soon as
          possible.
        </Label>
      </Card>

      <Card title="Schedule" footer={footer} width={[1, 1 / 2, 1 / 3, 1 / 4]}>
        <Label>We will arrive at each address at specified times.</Label>
      </Card>
    </Div>
  );
}

export default DeliverySchedule;
