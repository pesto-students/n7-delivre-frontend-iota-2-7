import React, { useState } from "react";
import { Div } from "../../../shared/components/Div";
import { Container } from "../../../shared/components/Container";
import { Heading } from "../../../shared/components/Heading";
import { Section } from "../../../shared/components/Section";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { createTravel } from "../../../redux/reducers/travelReducer";
import TravelForm from "./TravelForm";



export const TravelPlan = () => {
  
  /** history hooks */
  const history = useHistory();

  /** dispatch hooks */
  const dispatch = useDispatch();

  /** selector hooks */
  const user = useSelector((state) => state.login.user);
  const loading = useSelector((state) => state.travel.loading);

  /** state hooks */
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



  const _validationSchemaObject = {

    from: Yup.object().required("From is required"),

    to: Yup.object().required("To is required"),

    departureDate: Yup.string().nullable(true).required("Date is required"),

    weight: Yup.string().required("Weight is required"),

    mobile: Yup.string()
      .min(10, "Must be 10 digits")
      .max(10, "Must be 10 digits")
      .required("Mobile number is required"),

    currentAddress: Yup.string().required("Complete Address is required"),
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
    validationSchema: Yup.object(_validationSchemaObject),
    onSubmit: async (values) => {
      await submitHandler(values, dispatch, history);
    },
  });



  return (
    <Section>
      <Container m="auto">
        <Div>
          <Heading size="big" weight="hairline" mt={40} mb={40}>
            Travel Plan
          </Heading>
        </Div>
        <Div mt={20} borderRadius={5} shadow>
          <TravelForm formik={formik} loading={loading} setFile={setFile} />
        </Div>
      </Container>
    </Section>
  );
};
