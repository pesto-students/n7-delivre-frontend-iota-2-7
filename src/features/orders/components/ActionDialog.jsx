import React from "react";
import { PrimaryButton } from "../../../shared/components/Button";
import { Dialog } from "../../../shared/components/Dialog";
import { Div } from "../../../shared/components/Div";
import Form from "../../../shared/components/Form";
import { Label } from "../../../shared/components/Label";
import { Span } from "../../../shared/components/Span";
import { CardElement } from "@stripe/react-stripe-js";
import { Rating } from "../../../shared/components/Rating";
import { RupeeIcon } from "../../../shared/components/Icon";



/**
 * Renders Dialog Component for respective Orders Item
 * @param {boolean} loading - loading state for button 
 * @param {JSON} modalData - data to populate in Dialog
 * @param {boolean} showModal - flag to show/hide Dialog
 * @param {boolean} showPaymentModal - flag to show/hide Dialog
 * @param {Function} hideHandler - Handler for hiding Dialog
 * @param {Function} acceptHandler - Handler for on click of Accept
 * @param {Function} rejectHandler - Handler for on click of Reject
 * @param {Function} handleStripePayment - Handler for on click of Pay
 * @returns {JSX} Dialog to show record of selected Table Row
 */

const ActionDialog = ({ modalData, showModal, showPaymentModal, acceptHandler, hideHandler, handleStripePayment, rejectHandler, loading }) => {


  /** Render footer in Dialog 
   * If Action Dialog then display Accept/Reject buttons
   * Else display Proceed to pay button
  */
  const footer = showPaymentModal ? (

    <Form onSubmit={handleStripePayment} textAlign="center">
      <Div>
        <CardElement />
      </Div>
      <PrimaryButton loading={loading} label="Proceed to pay"/>
    </Form>

  ) : (
    <Div textAlign="center">
      <PrimaryButton label="Accept" onClick={acceptHandler} />
      <PrimaryButton
        label="Reject"
        background="red"
        bold="true"
        onClick={rejectHandler}
      />
    </Div>
  );



  /** Render Template in respective Column with Item*/
  const bodyTemplate = ({label, value}) => {

    return (

      <Div key={label} display="grid" gridTemplateColumns="1fr 1fr">
        <Span>
          <Label weight="bold" >
            {label} :
          </Label>
        </Span>
          <Span>
            <Label >{value}</Label>
          </Span>
      </Div>

    );
  };


  /** Render Template in respective Column with Item*/
  const weightTemplate = ({label, value}) => {

    return (

      <Div key={label} display="grid" gridTemplateColumns="1fr 1fr">
        <Span>
          <Label weight="bold" >
            {label} :
          </Label>
        </Span>
          <Span>
            <Label>upto {value} kg</Label>
          </Span>
      </Div>

    );
  };


  /** Render Template in respective Column with Item
   * If Action Dialog then display Rating column buttons
   * Else display Amount column
  */
  const amountTemplate = ({label, value}) => {

    return showPaymentModal ? (

      <Div key={label} display="grid" gridTemplateColumns="1fr 1fr">
        <Span>
          <Label weight="xbold">
            {label} :
          </Label>
        </Span>
        <Span>
        <Label > <RupeeIcon/> {value}</Label>
        </Span>
      </Div>

    ) : (

      <Div key={label} display="grid" gridTemplateColumns="1fr 1fr">
        <Span>
          <Label weight="xbold" >
            Rating :
          </Label>
        </Span>
        <Span>
          <Rating stars={5} value={4} cancel={false} />
        </Span>
      </Div>

    );
  };




  /**
   * Configuration List of Dialog Items
   */
  const dialogItems = [
    { key: 0,label: "Volunteer", value: modalData.volunteerName, template: bodyTemplate },
    {
      key: 1,
      label: "Pickup",
      value: modalData["pickup"]["name"],
      template: bodyTemplate,
    },
    {
      key: 2,
      label: "Delivery",
      value: modalData["delivery"]["name"],
      template: bodyTemplate,
    },
    { lkey: 3,label: "Package", value: modalData.itemType, template: bodyTemplate },
    { label: "Weight", value: modalData.weight, template: weightTemplate },
    {
      key: 4,
      label: "Total Amount",
      value: modalData.price,
      template: amountTemplate,
    },
  ];

  

  
  return (
    <Dialog
      header="Delivery details"
      visible={showModal || showPaymentModal}
      style={{ width: "30vw" }}
      footer={footer}
      breakpoints={{ "960px": "75vw" }}
      onHide={hideHandler}
    >
      {dialogItems.map((item) => item.template(item))}
    </Dialog>
  );
}

export default ActionDialog;
