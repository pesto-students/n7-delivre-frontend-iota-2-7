import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../../redux/reducers/orderReducer";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  PARTNERS,
  WEIGHT_BASE_PRICE,
  DELIVERY_PARTNER_BASE_PRICE,
} from "../../../shared/constant";
import OrderForm from "./OrderForm";
import { logger } from "@sentry/utils";



/** calculate the percentage 
 * @param {Number} percent
 * @param {Number} total
 * @returns {Number} value
*/
function percentage(percent, total) {
  return ((percent / 100) * total).toFixed(2);
}


/**
 * Algorithm to calculate total price of an order
 * @param {String} weight
 * @param {String} itemValue
 * @param {boolean} deliveryBag
 * @param {String} deliveryPartner 
 * @returns {String} final price
 */
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
      ? DELIVERY_PARTNER_BASE_PRICE[deliveryPartner]
      : 0;
      
    const weightPrice = weight ? WEIGHT_BASE_PRICE[weight] : 0;
    
    const itemValuePrice = itemValue
      ? Math.floor(Number(percentage(0.85, itemValue)))
      : 0;

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



/**
 * Method to handle form submission
 * @param {JSON} values 
 * @param {Function} dispatch 
 * @param {Object} history 
 */
export const submitHandler = async (values, dispatch, history) => {

  values.price = calculatePrice(values);

  const payload = JSON.stringify(values, null, 2);

  /** Fire createOrder action */
  dispatch(createOrder(JSON.parse(payload)))
    .unwrap()
    .then(() => {
      
      history.push("/order-list");

    })
    .catch((rejectedValueOrSerializedError) => {

      logger.error("Could Not Create Order", rejectedValueOrSerializedError);

    });
};


/** Render Order Form to create orders
 * @returns {JSX} Order Form Component
 */
export const CreateOrder = () => {


  /** initialize History object for routing */
  const history = useHistory();


  /** initialize Dispatch object to fire actions */
  const dispatch = useDispatch();


  /** initialize local state from Redux Store */
  const user = useSelector(({login}) => login?.user);
  const loading = useSelector(({order}) => order?.loading);


  /** initialize useState Hooks */
  const [itemValuePrice, setItemValuePrice] = useState(0);


  /** Method to handle onBlur event on Item value */
  const onBlurHandler = () => {

    const itemValue = formik.values.itemValue;

    setItemValuePrice(Math.floor(Number(percentage(0.85, itemValue))));

  };


  /** Initialize values for Form Data */
  const initialValues = {
    user: user?.id,
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
    username: user?.name,
  };


  /** Initialize object for Yup Validation Schema */
  const _validationSchemaObject = {

    pickup: Yup.object().nullable(true).required("Pickup City is required"),

    pickupMobile: Yup.string()
      .min(10, "Must be 10 digits")
      .max(10, "Must be 10 digits")
      .required("Mobile number is required"),

    pickupAddress: Yup.string().required("Complete Address is required"),

    delivery: Yup.object()
      .nullable(true)
      .required("Delivery City is required"),

    deliveryMobile: Yup.string()
      .max(10, "Must be 10 digits")
      .min(10, "Must be 10 digits")
      .required("Mobile number is required"),

    deliveryAddress: Yup.string().required("Complete Address is required"),

    weight: Yup.string().nullable(true).required("Weight is required"),
    
    itemType: Yup.string().nullable(true).required("Item type is required"),
    
    itemValue: Yup.string().notRequired(),
    
    deliveryBag: Yup.string().notRequired(),
    
    deliveryPartner: Yup.string()
      .nullable(true)
      .required("Delivery Partner is required"),
      
  }


  /** Initialize formik object from useFormik hooks */
  const formik = useFormik({

    initialValues: initialValues,

    validationSchema: Yup.object(_validationSchemaObject),

    onSubmit: async (values) => {
      await submitHandler(values, dispatch, history);
    },

  });

  

  return (
    <OrderForm
      formik={formik}
      partners={PARTNERS}
      loading={loading}
      calculatePrice={calculatePrice}
      onBlurHandler={onBlurHandler}
      itemValuePrice={itemValuePrice}
    />
  );

};
