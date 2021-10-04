import React from "react";
import { PrimaryButton } from "../../../shared/components/Button";
import { Div } from "../../../shared/components/Div";
import { RupeeIcon } from "../../../shared/components/Icon";
import { Label } from "../../../shared/components/Label";
import TermsNCondition from "./TermsNCondition";

function Price({priceHandler, loading}) {
  return (
    <Div 
      mt={20}
      borderRadius={5}
      shadow
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Label size="big" weight="medium">
        Total: from <RupeeIcon /> {priceHandler()}
      </Label>

      <PrimaryButton
        loading={loading}
        type='submit'
        pt={3}
        pb={3}
        pr={5}
        pl={5}
        radius="5"
        label="Submit Order"
      />

      <TermsNCondition />
    </Div>
  );
}

export default Price;
