import React from "react";
import { PrimaryButton } from "../../../shared/components/Button";
import { Calendar } from "../../../shared/components/Calendar";
import { Div } from "../../../shared/components/Div";
import { Dropdown } from "../../../shared/components/Dropdown";
import Error from "../../../shared/components/Error";
import Field from "../../../shared/components/Field";
import { FileUpload } from "../../../shared/components/FileUpload";
import Form from "../../../shared/components/Form";
import { InputText } from "../../../shared/components/Input";
import { Label } from "../../../shared/components/Label";
import { Span } from "../../../shared/components/Span";
import { InputTextArea } from "../../../shared/components/Textarea";
import { Weight } from "../../../shared/components/Weight";
import { CITIES } from "../../../shared/constant";



const minDate = new Date();

function TravelForm({ formik, loading, setFile }) {
  return (
    <Form>
      <Div>
        <Span display="flex" flexDirection="column" pt={10} pb={10}>
          <Label>From</Label>
          <Dropdown
            id="from"
            name="from"
            value={formik.values.from}
            options={CITIES}
            optionLabel="name"
            filter
            showClear
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            filterBy="name"
            placeholder="Select a City"
          />
          <Error formik={formik} name="from" />
        </Span>
        <Span display="flex" flexDirection="column" pt={10} pb={10}>
          <Label>To</Label>
          <Dropdown
            id="to"
            name="to"
            value={formik.values.to}
            options={CITIES}
            optionLabel="name"
            filter
            showClear
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            filterBy="name"
            placeholder="Select a City"
          />
          <Error formik={formik} name="to" />
        </Span>
        <Field display="flex" flexDirection="column" pt={10} pb={10}>
          <Label size="medium" weight="bold">
            10-digit mobile
          </Label>
          <InputText
            id="mobile"
            name="mobile"
            placeholder="Mobile"
            type="number"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            border="true"
          />
          <Error formik={formik} name="mobile" />
        </Field>
        <Span display="flex" flexDirection="column" pt={10} pb={10}>
          <Label size="medium" weight="bold">
            Departure Date
          </Label>
          <Calendar
            id="departureDate"
            name="departureDate"
            showButtonBar
            showIcon
            monthNavigator
            minDate={minDate}
            value={formik.values.departureDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Error formik={formik} name="departureDate" />
        </Span>
      </Div>
      <Div>
        <Weight
          id="weight"
          name="weight"
          value={formik.values.weight}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Error formik={formik} name="weight" />
      </Div>
      <Div>
        <Label size="medium" weight="bold">
          Identity Proof
        </Label>
        <FileUpload
          id="idProof"
          name="idProof"
          uploadHandler={(e) => setFile(e.files[0])}
          customUpload
          value={formik.values.idProof}
          onChange={formik.handleChange}
        />
        <Error formik={formik} name="idProof" />
      </Div>

      <Div display="flex" flexDirection="column">
        <Label size="medium" weight="bold">
          Current Address
        </Label>
        <InputTextArea
          id="currentAddress"
          name="currentAddress"
          value={formik.values.currentAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={5}
          cols={30}
          autoResize
          placeholder="Current Address"
          mt={10}
        />
        <Error formik={formik} name="currentAddress" />
      </Div>
      <PrimaryButton
        type="submit"
        loading={loading}
        pt={3}
        pb={3}
        pr={5}
        pl={5}
        width="auto"
        radius="5"
        label="Submit Travel Plan"
        onClick={formik.handleSubmit}
      />
    </Form>
  );
}

export default TravelForm;
