import { ErrorBoundary } from "@sentry/react";
import React from "react";
import { PrimaryButton } from "../../../shared/components/Button";
import { Carousel } from "../../../shared/components/Carousel";
import { Dialog } from "../../../shared/components/Dialog";
import { Div } from "../../../shared/components/Div";
import { Image } from "../../../shared/components/Image";
import { Label } from "../../../shared/components/Label";
import { Span } from "../../../shared/components/Span";

function DetailsDialog({ loading, modalData, showModal, hideHandler, interestHandler }) {
  const footer = (
    <Div textAlign="center">
      <PrimaryButton loading={loading} label="Interested" onClick={interestHandler} />
    </Div>
  );

  const bodyTemplate = (item) => {
    return (
      <Div display='grid' gridTemplateColumns='1fr 1fr'>
        <Span>
          <Label weight="bold">
            {item.label} 
          </Label>
        </Span>
        <ErrorBoundary>
          <Span>
            <Label>{item.value}</Label>
          </Span>
        </ErrorBoundary>
      </Div>
    );
  };

  const imageTemplate = (item) => {
    return (<Div><Carousel
      value={item.value}
      numVisible={1}
      itemTemplate={productTemplate}
    /></Div>);
  };

  const dialogItems = [
    { label: "Customer", value: modalData.username, template: bodyTemplate },
    {
      label: "Pickup",
      value: modalData["pickup"]["name"],
      template: bodyTemplate,
    },
    {
      label: "Delivery",
      value: modalData["delivery"]["name"],
      template: bodyTemplate,
    },
    { label: "Package", value: modalData.itemType, template: bodyTemplate },
    { label: "Weight", value: modalData.weight, template: bodyTemplate },
    {
      label: "Images",
      value: [{ name: "image1" }, { name: "image1" }],
      template: imageTemplate,
    },
  ];

  const productTemplate = (product) => (
    <Image
      src="https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFja2FnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      alt={product.name}
      width={1}
      className="product-image"
    />
  );

  return (
    <Dialog
      header="Delivery details"
      visible={showModal}
      style={{ width: "30vw" }}
      footer={footer}
      breakpoints={{ "960px": "75vw" }}
      onHide={hideHandler}
    >
      {dialogItems.map(item => item.template(item))}
    </Dialog>
  );
}

export default DetailsDialog;
