import React, { useState } from "react";
import { Div } from "../../../shared/components/Div";
import { Container } from "../../../shared/components/Container";
import { Heading } from "../../../shared/components/Heading";
import { Label } from "../../../shared/components/Label";
import { Checkbox } from "../../../shared/components/Checkbox";
import { Section } from "../../../shared/components/Section";
import { Address } from "./Address";
import { Weight } from "../../../shared/components/Weight";
import { SelectBox } from "../../../shared/components/SelectBox";
import Form from "../../../shared/components/Form";
import Field from "../../../shared/components/Field";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../../redux/reducers/orderReducer";
import { useHistory } from "react-router-dom";
import DeliverySchedule from "./DeliverySchedule";
import ItemType from "./ItemType";
import Insurance from "./Insurance";
import Price from "./Price";
import * as Yup from "yup";
import Error from "../../../shared/components/Error";

const partners = [
  { label: "Dunzo", value: "dunzo" },
  { label: "Swiggy", value: "swiggy" },
  { label: "WeFast", value: "wefast" },
];

const weightBasePrice = {
  1: 10,
  5: 15,
  10: 20,
  15: 25,
  20: 30,
};
const deliveryPartnerBasePrice = {
  dunzo: 10,
  swiggy: 20,
  wefast: 5,
};
function percentage(percent, total) {
  return ((percent/ 100) * total).toFixed(2)
}
const calculatePrice = ({
  weight,
  itemValue,
  deliveryBag,
  deliveryPartner,
}) => {
  const basePrice = 39;
  if (weight || itemValue || deliveryBag || deliveryPartner) {
    const deliveryBagPrice = deliveryBag ? 10 : 0;

    const deliveryPartnerPrice = deliveryPartner
      ? deliveryPartnerBasePrice[deliveryPartner]
      : 0;
    const weightPrice = weight ? weightBasePrice[weight] : 0;
    const itemValuePrice = itemValue ? Math.floor(Number(percentage(0.85, itemValue))) : 0;

    const finalPrice =
      basePrice +
      weightPrice +
      deliveryBagPrice +
      itemValuePrice +
      deliveryPartnerPrice;

    return finalPrice;
  }
  return basePrice;
};

export const submitHandler = async (values, dispatch, history) => {
  console.log("Submit called");
  values.price = calculatePrice(values);

  console.log(JSON.stringify(values, null, 2));

  const payload = JSON.stringify(values, null, 2);

  dispatch(createOrder(JSON.parse(payload)))
    .unwrap()
    .then((originalPromiseResult) => {
      console.info("Create Order Response", originalPromiseResult);
      history.push("/order-list");
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
      console.info(rejectedValueOrSerializedError);
    });
};


export const CreateOrder = () => {
  const user = useSelector((state) => state.login.user);
  const loading = useSelector(state => state.order.loading);
  const [itemValuePrice, setItemValuePrice] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  
  
  const onBlurHandler = () => {
    const itemValue = formik.values.itemValue;
    setItemValuePrice(Math.floor(Number(percentage(0.85, itemValue))));
  }

  const initialValues = {
    user: user.id,
    pickup: "",
    pickupMobile: "",
    pickupAddress: "",
    delivery: "",
    deliveryMobile: "",
    deliveryAddress: "",
    weight: "",
    itemType: "",
    itemValue: "",
    deliveryBag: false,
    deliveryPartner: "",
    price: "",
    volunteer: "",
    username: user.name,
  };

  const validationSchema = () => {
    return Yup.object({
      // pickup: Yup.object().nullable(true).required("Pickup City is required"),
      pickupMobile: Yup.string()
        .min(10, "Must be 10 digits")
        .max(10, "Must be 10 digits")
        .required("Mobile number is required"),
      pickupAddress: Yup.string().required("Complete Address is required"),
      // delivery: Yup.object().nullable(true).required("Delivery City is required"),
      deliveryMobile: Yup.string()
        .max(10, "Must be 10 digits")
        .min(10, "Must be 10 digits")
        .required("Mobile number is required"),
      deliveryAddress: Yup.string().required("Complete Address is required"),
      // weight: Yup.string().nullable(true).required("Weight is required"),
      itemType: Yup.string().nullable(true).required("Item type is required"),
      itemValue: Yup.string().notRequired(),
      deliveryBag: Yup.string().notRequired(),
      // deliveryPartner: Yup.string().nullable(true).required("Delivery Partner is required"),
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
      <Container width={[1, "auto"]}>
        {/* title */}
        <Div>
          <Heading size="big" weight="hairline" mt={40} mb={40}>
            Order
          </Heading>
        </Div>

        {/* Delivery Schedule */}
        <DeliverySchedule />

        <Div width={[1, "auto"]} shadow mt={20}>
          <Weight
            id="weight"
            name="weight"
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Error formik={formik} name="weight" />
        </Div>

        <Form onSubmit={formik.handleSubmit}>
          {/* Pickup Address */}
          <Address title="Pickup" formik={formik} />

          {/* Delivery Address */}
          <Address title="Delivery" formik={formik} />

          {/* Item Type */}
          <ItemType formik={formik} />

          {/* Insurance */}
          <Insurance formik={formik} itemValuePrice={itemValuePrice} onBlur={onBlurHandler} />

          {/* Delivery Bag Option */}
          <Field p={3} mt={20}>
            <Checkbox
              inputId="deliveryBag"
              name="deliveryBag"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.deliveryBag}
            ></Checkbox>
            <Label htmlFor="deliveryBag" pl={2}>
              Prefer Courier with Delivery Bag
            </Label>
          </Field>

          {/* Delivery Partner Option */}
          <Field p={3} mt={20}>
            <Label weight="bold">Delivery Partner</Label>
            <SelectBox
              value={formik.values.deliveryPartner}
              id="deliveryPartner"
              name="deliveryPartner"
              options={partners}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              mt={10}
              large
            />
            <Error formik={formik} name="deliveryPartner" />
          </Field>

          {/* Price component */}
          <Price
            priceHandler={() => calculatePrice(formik.values)}
            loading={loading}
          />
        </Form>
      </Container>
    </Section>
  );
};
