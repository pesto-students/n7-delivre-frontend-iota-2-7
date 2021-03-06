import React from "react";
import { Div } from "../../../shared/components/Div";
import Field from "../../../shared/components/Field";
import { InputText } from "../../../shared/components/Input";
import { Label } from "../../../shared/components/Label";
import { Span } from "../../../shared/components/Span";


/** Render Secure Parcel Component in Order Form 
 * @param {Object} formik
 * @param {String} itemValuePrice
 * @param {Function} onBlur
*/
const SecureParcel = ({ formik, itemValuePrice, onBlur }) => {

  return (

    <Div mt={20} borderRadius={5} shadow display="flex" flexDirection="column">
      
      <Label size="medium" weight="bold">
        Secure your parcel
      </Label>
      
      <Field className="insurance-field">
        <InputText
          id="itemValue"
          name="itemValue"
          placeholder="Parcel Value"
          border="true"
          value={formik.values.itemValue}
          onChange={formik.handleChange}
          onBlur={onBlur}
        />

        <Label
          htmlFor="itemValue"
          size="medium"
          weight="hairline"
          color="var(--black-600)"
          mt={2}
        >
          ₹ {itemValuePrice} : Additional charges for securing parcel
        </Label>
      </Field>
      
      <Span width="auto">
        <Label>
          Secure your important or fragile packages to retrieve the value in
          case of loss or damage done during delivery. We charge a fee of
          0.85%+GST of the value you declare above (added to the delivery cost)
          for this. Valid upto <Label weight='xbold'>₹ 50000</Label>.
        </Label>
      </Span>
      
    </Div>
  );
}

export default SecureParcel;
