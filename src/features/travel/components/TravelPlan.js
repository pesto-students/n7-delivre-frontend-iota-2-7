import React, { useState } from "react";
import { Div } from "../../../shared/components/Div";
import { Container } from "../../../shared/components/Container";
import { Span } from "../../../shared/components/Span";
import { Heading } from "../../../shared/components/Heading";
import { Label } from "../../../shared/components/Label";
import { Section } from "../../../shared/components/Section";
import { Weight } from "../../../shared/components/Weight";
import { InputTextArea } from "../../../shared/components/Textarea";
import { Dropdown } from "../../../shared/components/Dropdown";
import { InputText } from "../../../shared/components/Input";
import { Calendar } from "../../../shared/components/Calendar";
import { FileUpload } from "../../../shared/components/FileUpload";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { PrimaryButton } from "../../../shared/components/Button";
import Form from "../../../shared/components/Form";
import Error from "../../../shared/components/Error";
import Field from "../../../shared/components/Field";
import { createTravel } from "../../../redux/reducers/travelReducer";
import { CITIES } from "../../../shared/constant";

const minDate = new Date();
// minDate.setMonth()

export const TravelPlan = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const loading = useSelector((state) => state.travel.loading);

  const [file, setFile] = useState({});

  const initialValues = {
    user: user.id,
    from: "",
    to: "",
    mobile: "",
    departureDate: "",
    weight: "",
    idProof: "",
    currentAddress: "",
  };
  const validationSchema = () => {
    return Yup.object({
      from: Yup.object().required("From is required"),
      to: Yup.object().required("To is required"),
      departureDate: Yup.string().nullable(true).required("Date is required"),
      weight: Yup.string().required("Weight is required"),
      // idProof: Yup.string().required("Id proof is required"),
      mobile: Yup.string()
        .min(10, "Must be 10 digits")
        .max(10, "Must be 10 digits")
        .required("Mobile number is required"),
      currentAddress: Yup.string().required("Complete Address is required"),
    });
  };

  const submitHandler = async (values, dispatch, history) => {
    console.log("Submit Clicked");
    values.idProof = file;
    const payload = JSON.stringify(values, null, 2);

    dispatch(createTravel(JSON.parse(payload)))
      .unwrap()
      .then((originalPromiseResult) => {
        console.info(originalPromiseResult);
        history.push("/travel-list");
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.info(rejectedValueOrSerializedError);
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await submitHandler(values, dispatch, history);
    },
  });
  return (
    <Section>
      <Container m="auto">
        {/* title */}

        <Div>
          <Heading size="big" weight="hairline" mt={40} mb={40}>
            Travel Plan
          </Heading>
        </Div>
        <Div mt={20} borderRadius={5} shadow>
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
                // onUpload={onUpload}
                customUpload
                // url="https://primefaces.org/primereact/showcase/upload.php"
                value={formik.values.idProof}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
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
              label="Submit Order"
              onClick={formik.handleSubmit}
            />
          </Form>
        </Div>
      </Container>
    </Section>
  );
};
