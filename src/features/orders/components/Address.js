import { Div } from "../../../shared/components/Div";
import { Dropdown } from "../../../shared/components/Dropdown";
import Error from "../../../shared/components/Error";
import Field from "../../../shared/components/Field";
import { InputText } from "../../../shared/components/Input";
import { Label } from "../../../shared/components/Label";
import { InputTextArea } from "../../../shared/components/Textarea";
import {CITIES} from '../../../shared/constant';



export const Address = ({ title, formik }) => {
  const formikTitle = title.toLowerCase();
  const mobile = formikTitle + "Mobile";
  const address = formikTitle + "Address";
  return (
    <Div shadow mt={20}>
      <Field mb={3}>
        <Label htmlFor={formikTitle} size="medium" weight="bold">
          {title} City
        </Label>

        <Dropdown
          id={formikTitle}
          name={formikTitle}
          value={formik.values[formikTitle]}
          options={CITIES}
          optionLabel="name"
          filter
          showClear
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          filterBy="name"
          placeholder="Select a City"
        />
        <Error formik={formik} name={formikTitle} />
      </Field>
      <Field mb={3}>
        <Label htmlFor={mobile} size="medium" weight="bold">
          10-digit mobile
        </Label>
        <InputText
          id={mobile}
          name={mobile}
          type="number"
          placeholder="Mobile"
          border="true"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[mobile]}
        />
        <Error formik={formik} name={mobile} />
      </Field>
      <Field mb={3}>
        <Label htmlFor={address} size="medium" weight="bold">
          Complete Address
        </Label>
        <InputTextArea
          id={address}
          name={address}
          type="text"
          rows={5}
          cols={30}
          autoResize
          placeholder="Complete Address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[address]}
        />
        <Error formik={formik} name={address} />
      </Field>
    </Div>
  );
};
