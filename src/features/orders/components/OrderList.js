import React, { useEffect, useState } from "react";
import { Div } from "../../../shared/components/Div";
import { Container } from "../../../shared/components/Container";
import { Heading } from "../../../shared/components/Heading";
import { Section } from "../../../shared/components/Section";
import { Skeleton } from "../../../shared/components/Skeleton";
import { NavBar } from "../../../shared/components/Navbar";
import { Table } from "../../../shared/components/Table";
import { Column } from "primereact/column";
import { TextButton } from "../../../shared/components/Button";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, updateOrder } from "../../../redux/reducers/orderReducer";
import FilterButtons from "../../../shared/components/FilterButtons";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createApi } from "../../../shared/api/crud";
import ActionDialog from "./ActionDialog";
import { useHistory } from "react-router-dom";


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT_KEY);

const colorMap = {
  Assigned: "yellow",
  Action: "red",
  Payment: "blue",
  Track: "primary",
  Confirmed: "primary",
};


const OrderList = () => {

  const history = useHistory();
  // dispatch hooks
  const dispatch = useDispatch();

  const [processing, setProcessing] = useState(false);

  // selector hooks
  const loading = useSelector((state) => state.order.loading);
  const orders = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.login.user);

  // state hooks
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [modalData, setModalData] = useState({delivery: { name: "" },pickup: { name: "" }});
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  // effect hooks
  useEffect(() => {
    dispatch(fetchOrders(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    async function createPaymentIntent(item){
      try{
        const response = await createApi(item, 'create-payment-intent');
        console.log("Client Response", response);
        if(response) setClientSecret(response.clientSecret);
      }
      catch(err){
        console.log(err);
      }
    }
    if(showPaymentModal) createPaymentIntent(modalData);
  }, [showPaymentModal, modalData]);

  // stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  const sendEmailToCustomer = async (paymentIntent) => {
    try {
      const response = await createApi(paymentIntent, 'sendMail');
      if(response) {
        console.log("Email Sent", response);

      }

    }
    catch(err){
      console.log(err);
    }
  }

  const orderComplete = (paymentId) => {
    modalData.status = "Track";
    modalData.paymentId = paymentId;
    dispatch(updateOrder(modalData))
      .unwrap()
      .then((originalPromiseResult) => {
        console.info("Order Complete Response", originalPromiseResult);
        setShowModal(false);
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.info(rejectedValueOrSerializedError);
      });
  }
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
          // Show error to your customer
          console.log("[error]", result.error.message);
        } else {
          // The payment succeeded!
          console.log("Payment Succeeded", result);
          sendEmailToCustomer(result.paymentIntent);
          orderComplete(result.paymentIntent.id);
          setShowPaymentModal(false);
          
        }
      });
  }
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

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    }); 

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setProcessing(true);
      confirmStripePayment(cardElement)
      
    }
  };
  const bodyTemplate = (data, props) => {
    return loading ? (
      <Skeleton key={props.field} />
    ) : (
      <React.Fragment>
        <span className="p-column-title">{props.header}</span>
        {data[props.field]}
      </React.Fragment>
    );
  };
  const cityTemplate = (data, props) => {
    return loading ? (
      <Skeleton key={props.field} />
    ) : (
      <React.Fragment>
        <span className="p-column-title">{props.header}</span>
        {data[props.field]["name"]}
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (data, props) => {
    return loading ? (
      <Skeleton key={props.field} />
    ) : (
      <React.Fragment>
        <TextButton
          p={1}
          width="auto"
          radius={4}
          border={colorMap[data[props.field]]}
          label={data[props.field]}
          onClick={() => statusHandler(data)}
        />
      </React.Fragment>
    );
  };

  const actionHandler = (data) => {
    console.log("Action CLicked");
    setShowModal(true);
    setModalData({ ...data });
  };
  const paymentHandler = (data) => {
    setShowPaymentModal(true);
    setModalData({ ...data });
  };

  const trackHandler = () => {
    history.push('/track-orders');
  }

  const statusHandler = (data) => {
    console.log(data);
    switch (data.status) {
      case "Assigned":
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
      case "Completed":
        return;
      default:
        return;
    }
  };

  

  const acceptHandler = () => {

    modalData.status = "Payment";

    dispatch(updateOrder(modalData))
      .unwrap()
      .then((originalPromiseResult) => {
        console.info("Accept Handler Response", originalPromiseResult);
        setShowModal(false);
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.info(rejectedValueOrSerializedError);
      });
  };
  const rejectHandler = () => {
    modalData.status = "Assigned";
    modalData.volunteer = "";
    dispatch(updateOrder(modalData))
      .unwrap()
      .then((originalPromiseResult) => {
        console.info("Reject Handler Response", originalPromiseResult);
        setShowModal(false);
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.info(rejectedValueOrSerializedError);
      });
  }
  
  const hideHandler = () => {
    setShowModal(false);
    setShowPaymentModal(false);
  };
  

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
    { field: "pickup", header: "Pickup", body: cityTemplate, width: 40 },
    {
      field: "delivery",
      header: "Delivery",
      body: cityTemplate,
      width: 40,
    },
    { field: "itemType", header: "Item", body: bodyTemplate, width: 20 },
    { field: "weight", header: "Weight", body: bodyTemplate, width: 20 },
    { field: "price", header: "Price", body: bodyTemplate, width: 20 },
    { field: "status", header: "Status", body: statusBodyTemplate, width: 30 },
  ];

  const dynamicColumns = columns.map((col) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        sortable={col.sortable}
        style={{ width: col.width + "%" }}
      />
    );
  });

  const textButtons = [
    { label: "All Orders", filterValue: "all" },
    { label: "Active", filterValue: "active" },
    { label: "Completed", filterValue: "completed" },
    { label: "Drafts", filterValue: "all" },
  ];

  const getTableValue = () => {
    switch (filterOption) {
      case "all":
        return orders.all;
      case "active":
        return orders.active;
      case "completed":
        return orders.completed;
      default:
        return orders.all;
    }
  };

  return (
    <Section>
      <NavBar
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      <Container>

        <Div m="auto">
          <Heading size="big" weight="hairline" mt={40} mb={40}>
            Order List
          </Heading>

          <FilterButtons textButtons={textButtons} handler={setFilterOption} />
          {/* <SpeedDial model={items} radius={80} showIcon="pi pi-bars" hideIcon="pi pi-times" transitionDelay={80} direction="left" type="linear" /> */}


          <Div mt={40} borderRadius={5} shadow>
            <Table
              width="auto"
              value={getTableValue()}
              paginator
              rows={10}
              rowHover
              resizableColumns
              columnResizeMode="expand"
              sortMode="multiple"
              globalFilter={globalFilter}
              emptyMessage="No orders found."
            >
              {dynamicColumns}
            </Table>
          </Div>
        </Div>
      </Container>

      <ActionDialog loading={processing} modalData={modalData} showModal={showModal} showPaymentModal={showPaymentModal} acceptHandler={acceptHandler} rejectHandler={rejectHandler} hideHandler={hideHandler} handleStripePayment={handleStripePayment}/>
      
    </Section>
  );
};

const StripedOrderList = ({children}) => (
  <Elements stripe={stripePromise}>
    <OrderList> {children} </OrderList>
  </Elements>
);
export default StripedOrderList;
