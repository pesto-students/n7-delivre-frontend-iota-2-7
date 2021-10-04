import React from 'react'
import { Div } from '../../../shared/components/Div'
import Field from '../../../shared/components/Field'
import { InputText } from '../../../shared/components/Input'
import { Label } from '../../../shared/components/Label'
import { SelectBox } from '../../../shared/components/SelectBox'

const chips = [
    { label: "Document", value: "Document" },
    { label: "Food", value: "Food" },
    { label: "Cloth", value: "Cloth" },
    { label: "Groceries", value: "Groceries" },
    { label: "Flowers", value: "Flowers" },
    { label: "Cake", value: "Cake" },
    { label: "Parcel", value: "Parcel" },
  ];
  
function ItemType({formik}) {
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
                options={chips}
                onChange={formik.handleChange}
                mt={10}
              />
            </Field>
            {formik.touched.itemType && formik.errors.itemType ? (
         <Label size='small' color='error'>{formik.errors.itemType}</Label>
       ) : null}
          </Div>
    )
}

export default ItemType
