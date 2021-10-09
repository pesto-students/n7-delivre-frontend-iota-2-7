import React, { useEffect, useState } from "react";
import { Skeleton } from "../../../shared/components/Skeleton";
import { TextButton } from "../../../shared/components/Button";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, updateOrder } from "../../../redux/reducers/orderReducer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createApi } from "../../../shared/api/crud";
import ActionDialog from "./ActionDialog";
import { useHistory } from "react-router-dom";
import {FILTER_OPTIONS, STATUS_COLOR} from '../../../shared/constant';
import List from "../../../shared/components/List";
import { logger } from "@sentry/utils";
import { dynamicColumns, getTableValue, sendEmailToCustomer } from "../../../shared/utils/utils";



/** Initialize Stripe object with promise
 * loads the stripe payment module
 */
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT_KEY);


/**
 * Renders Orders List Component
 * @returns Orders List
 */
const OrderList = () => {

  /** History hooks */
  const history = useHistory();


  /** Dispatch hooks */
  const dispatch = useDispatch();


  /** Selector hooks */
  const loading = useSelector((state) => state.order.loading);
  const orders = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.login.user);


  /** State hooks */
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [modalData, setModalData] = useState({delivery: { name: "" },pickup: { name: "" }, status:"", paymentId:"", volunteer:""});


  /** Stripe hooks */
  const stripe = useStripe();
  const elements = useElements();

  /** Effect hooks */
  useEffect(() => {

    dispatch(fetchOrders(user.id));
    
  }, [dispatch, user]);


  useEffect(() => {

    // Create PaymentIntent as soon as the page loads
    async function createPaymentIntent(item){

      try{

        const response = await createApi(item, 'create-payment-intent');
        
        if(response) setClientSecret(response.clientSecret);
      
      }
      catch(err){
        
        logger.error("Could not create Payment Intent", err);

      }
    }

    if(showPaymentModal) createPaymentIntent(modalData);

  }, [showPaymentModal, modalData]);

  


  /**
   * This method handles the Order Completion process after the payment
   * @param {String} paymentId 
   */
  const orderComplete = (paymentId) => {

    modalData.status = "Track";
    
    modalData.paymentId = paymentId;
    
    dispatch(updateOrder(modalData))
      .unwrap()
      .then((originalPromiseResult) => {
        
        logger.log("Order Completed", originalPromiseResult);
        
        setShowModal(false);
      
      })
      .catch((rejectedValueOrSerializedError) => {

        logger.error("Could not complete order", rejectedValueOrSerializedError);

      });
  }



  /** Initiate the payment process */
  const confirmStripePayment = (cardElement) => {

    stripe
      .confirmCardPayment(clientSecret, {
        receipt_email: user.email,
        payment_method: {
          card: cardElement
        }
      })
      .then(async function(result) {

        if (result.error) {
          
          // Show error to customer
          logger.error("[Payment Failed]", result.error.message);

        } else {

          // The payment succeeded!
          logger.log("Payment Succeeded", result);

          sendEmailToCustomer(result.paymentIntent);
          
          orderComplete(result.paymentIntent.id);
          
          setShowPaymentModal(false);
          
        }
      });
  }


  /** Payment handler */
  const handleStripePayment = async (event) => {

    // Block native form submission.
    event.preventDefault();
    
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    }); 

    if (error) {

      logger.error("[Failed to initiate payment]", error);
    
    } else {

      logger.log("[PaymentMethod]", paymentMethod);

      setProcessing(true);
      
      confirmStripePayment(cardElement)
      
    }
  };


  /** Templates for Item Values in Data Table
   * @param item - data to populate table column 
   * @param field - unique column identifier
   * @param header - column header name
   * @returns JSX Element
   */
  const bodyTemplate = (item, {field, header}) => {
    return loading ? (
      <Skeleton key={field} />
    ) : (
      <React.Fragment>
        <span className="p-column-title">{header}</span>
        {item[field]}
      </React.Fragment>
    );
  };


  /** Templates for Item Values in Data Table
   * @param item - data to populate table column 
   * @param field - unique column identifier
   * @param header - column header name
   * @returns JSX Element
   */
  const weightTemplate = (item, {field, header}) => {
    return loading ? (
      <Skeleton key={field} />
    ) : (
      <React.Fragment>
        <span className="p-column-title">{header}</span>
        upto {item[field]} kg
      </React.Fragment>
    );
  };



  /** Templates for Item Values in Data Table
   * @param item - data to populate table column 
   * @param field - unique column identifier
   * @param header - column header name
   * @returns JSX Element
   */
  const cityTemplate = (item, {field, header}) => {
    return loading ? (
      <Skeleton key={field} />
    ) : (
      <React.Fragment>
        <span className="p-column-title">{header}</span>
        {item[field]["name"]}
      </React.Fragment>
    );
  };



  /** Templates for Item Values in Data Table
   * @param item - data to populate table column 
   * @param field - unique column identifier
   * @param header - column header name
   * @returns JSX Element
   */
  const statusBodyTemplate = (item, {field, header}) => {

    return loading ? (
      <Skeleton key={field} />
    ) : (
      <React.Fragment>
        <span className="p-column-title">{header}</span>
        <TextButton
          p={1}
          width="auto"
          radius={4}
          border={STATUS_COLOR[item[field]]}
          label={item[field]}
          onClick={() => statusHandler(item)}
        />
      </React.Fragment>
    );
  };



  /** Handler for Action Status */
  const actionHandler = (data) => {

    setShowModal(true);
    
    setModalData({ ...data });
  };



  /** Handler for Payment Status */
  const paymentHandler = (data) => {

    setShowPaymentModal(true);
    
    setModalData({ ...data });
  };


  /** Handler for Track Status */
  const trackHandler = ({id}) => {

    history.push('/track-orders/'+ id);

  }


  /** Handler to manage different status states */
  const statusHandler = (data) => {

    switch (data.status) {

      case ["Assigned", "Completed"]:
        return;

      case "Action":
        actionHandler(data);
        break;

      case "Payment":
        paymentHandler(data);
        break;

      case "Track":
        trackHandler(data);
        break;
        
      default:
        return;

    }
  };

  

  /** Handler to accept the volunteer request */
  const acceptHandler = () => {

    modalData.status = "Payment";

    dispatch(updateOrder(modalData))
      .unwrap()
      .then((originalPromiseResult) => {

        logger.log("Accept Handler Response", originalPromiseResult);

        setShowModal(false);

      })
      .catch((rejectedValueOrSerializedError) => {
        
        logger.error("Could not accept the order",rejectedValueOrSerializedError);

      });
  };



  /** Handler to reject the volunteer request */
  const rejectHandler = () => {

    modalData.status = "Assigned";
    
    modalData.volunteer = "";
    
    dispatch(updateOrder(modalData))
      .unwrap()
      .then((originalPromiseResult) => {

        logger.log("Reject Handler Response", originalPromiseResult);

        setShowModal(false);

      })
      .catch((rejectedValueOrSerializedError) => {

        // handle error here
        logger.log(rejectedValueOrSerializedError);

      });

  }
  


  /** Handler to hide Dialog */
  const hideHandler = () => {

    setShowModal(false);

    setShowPaymentModal(false);

  };
  


  /** Columns definition for Data Table */
  const columns = [
    {
      field: "id",
      header: "Order",
      sortable: true,
      body: bodyTemplate,
      width: 40,
    },
    {
      field: "created",
      header: "Created",
      sortable: true,
      body: bodyTemplate,
      width: 30,
    },
    { field: "pickup", header: "Pickup", body: cityTemplate, width: 30 },
    {
      field: "delivery",
      header: "Delivery",
      body: cityTemplate,
      width: 30,
    },
    { field: "itemType", header: "Item", body: bodyTemplate, width: 20 },
    { field: "weight", header: "Weight", body: weightTemplate, width: 30 },
    { field: "price", header: "Price", body: bodyTemplate, width: 20 },
    { field: "status", header: "Status", body: statusBodyTemplate, width: 30 },
  ];

  


  return (
    <React.Fragment>
      <List 
        title='Order List' 
        globalFilter={globalFilter} 
        setGlobalFilter={setGlobalFilter} 
        textButtons={FILTER_OPTIONS} 
        setFilterOption={setFilterOption} 
        getTableValue={() => getTableValue(orders, filterOption)}
        dynamicColumns={() => dynamicColumns(columns)}
      />

      <ActionDialog 
        loading={processing} 
        modalData={modalData} 
        showModal={showModal} 
        showPaymentModal={showPaymentModal} 
        acceptHandler={acceptHandler} 
        rejectHandler={rejectHandler} 
        hideHandler={hideHandler} 
        handleStripePayment={handleStripePayment}
        />
    </React.Fragment>
  );
};



const StripedOrderList = ({children}) => (
  <Elements stripe={stripePromise}>
    <OrderList> {children} </OrderList>
  </Elements>
);


export default StripedOrderList;
