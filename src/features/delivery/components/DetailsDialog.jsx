import React from "react";
import { PrimaryButton } from "../../../shared/components/Button";
import { Carousel } from "../../../shared/components/Carousel";
import { Dialog } from "../../../shared/components/Dialog";
import { Div } from "../../../shared/components/Div";
import { Image } from "../../../shared/components/Image";
import { Label } from "../../../shared/components/Label";
import { Span } from "../../../shared/components/Span";

/**
 * Renders Dialog Component for respective Orders Item
 * @param {boolean} loading - loading state for button 
 * @param {JSON} modalData - data to populate in Dialog
 * @param {boolean} showModal - flag to show/hide Dialog
 * @param {Function} hideHandler - Handler for hiding Dialog
 * @param {Function} interestHandler - Handler for on click of Interested
 * @returns {JSX} Dialog to show record of selected Table Row
 */
const DetailsDialog = ({ loading, modalData, showModal, hideHandler, interestHandler }) => {

  /** Render footer in Dialog */
  const footer = (

    <Div textAlign="center">
      <PrimaryButton loading={loading} label="Interested" onClick={interestHandler} />
    </Div>
    
  );


  /** Render Template in respective Column with Item*/
  const bodyTemplate = ({label, value}) => {

    return (
      
      <Div display='grid' gridTemplateColumns='1fr 1fr'>
        <Span>
          <Label weight="bold">
            {label} 
          </Label>
        </Span>
          <Span>
            <Label>{value}</Label>
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

  /** Render Template in respective Column with Item*/
  const imageTemplate = ({value}) => {

    return (
      <Div>
        <Carousel
          value={value}
          numVisible={1}
          itemTemplate={productTemplate}
        />
      </Div>
      );
  };


  /** Render Template in respective Column with Item*/
  const productTemplate = ({name}) => (
    <Image
      src="https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFja2FnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      alt={name}
      width={1}
      className="product-image"
    />
  );
  

  /** List of Items Data for Dialog */
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
    { label: "Weight", value: modalData.weight, template: weightTemplate },
    {
      label: "Images",
      value: [{ name: "image1" }, { name: "image1" }],
      template: imageTemplate,
    },
  ];


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
