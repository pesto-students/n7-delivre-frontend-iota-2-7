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

function ActionDialog({
  modalData,
  showModal,
  showPaymentModal,
  acceptHandler,
  hideHandler,
  handleStripePayment,
  rejectHandler,
  loading
}) {
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

  const bodyTemplate = (item) => {
    return (
      <Div key={item.label} display="grid" gridTemplateColumns="1fr 1fr">
        <Span>
          <Label weight="bold" >
            {item.label} :
          </Label>
        </Span>
          <Span>
            <Label >{item.value}</Label>
          </Span>
      </Div>
    );
  };
  const weightTemplate = (item) => {
    return (
      <Div key={item.label} display="grid" gridTemplateColumns="1fr 1fr">
        <Span>
          <Label weight="bold" >
            {item.label} :
          </Label>
        </Span>
          <Span>
            <Label>upto {item.value} kg</Label>
          </Span>
      </Div>
    );
  };

  const amountTemplate = (item) => {
    return showPaymentModal ? (
      <Div key={item.label} display="grid" gridTemplateColumns="1fr 1fr">
        <Span>
          <Label weight="xbold">
            {item.label} :
          </Label>
        </Span>
        <Span>
        <Label > <RupeeIcon/> {item.value}</Label>
        </Span>
      </Div>
    ) : (
      <Div key={item.label} display="grid" gridTemplateColumns="1fr 1fr">
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
