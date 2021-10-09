import React from "react";
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
import DeliverySchedule from "./DeliverySchedule";
import ItemType from "./ItemType";
import SecureParcel from "./Insurance";
import Price from "./Price";
import Error from "../../../shared/components/Error";



/** Render Order Form Component
 * @param {Object} formik'
 * @param {Array} partners
 * @param {boolean} loading
 * @param {Function} calculatePrice
 * @param {String} itemValuePrice
 * @param {Function} onBlurHandler
 * @returns Form for Create Order
 */
const OrderForm = ({formik, partners, loading, calculatePrice, itemValuePrice, onBlurHandler }) => {

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


        {/* Form */}
        <Form onSubmit={formik.handleSubmit}>

        {/* Weight */}
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

        {/* Pickup Address */}
        <Address title="Pickup" formik={formik} />

        {/* Delivery Address */}
        <Address title="Delivery" formik={formik} />

        {/* Item Type */}
        <ItemType formik={formik} />

        {/* SecureParcel */}
        <SecureParcel
            formik={formik}
            itemValuePrice={itemValuePrice}
            onBlur={onBlurHandler}
        />

        {/* Delivery Bag Option */}
        <Field p={3} mt={20}>
            <Checkbox
              inputId="deliveryBag"
              name="deliveryBag"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.deliveryBag}
              mr={2}
            ></Checkbox>
            <Label htmlFor="deliveryBag">
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

export default OrderForm;
