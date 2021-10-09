import React from "react";
import { Div } from "../../../shared/components/Div";
import Error from "../../../shared/components/Error";
import Field from "../../../shared/components/Field";
import { InputText } from "../../../shared/components/Input";
import { SelectBox } from "../../../shared/components/SelectBox";
import { CHIPS } from "../../../shared/constant";




/** Render Item Type Component
 * @param {Object} formik
 */
function ItemType({ formik }) {

  return (
    
    <Div mt={20} borderRadius={5} shadow>

      <Field>
        <InputText
          id="itemType"
          name="itemType"
          placeholder="What are you sending?"
          border="true"
          value={formik.values.itemType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <SelectBox
          id="itemType"
          name="itemType"
          value={formik.values.itemType}
          options={CHIPS}
          onChange={formik.handleChange}
          mt={10}
        />
      </Field>

      <Error formik={formik} name="itemType"/>
    
    </Div>
    
  );
}

export default ItemType;
