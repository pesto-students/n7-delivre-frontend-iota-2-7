import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "../../../shared/components/Skeleton";
import { TextButton } from "../../../shared/components/Button";
import { Toast } from "primereact/toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchDeliveries, updateDelivery } from "../../../redux/reducers/deliveryReducer";
import { Label } from "../../../shared/components/Label";
import DetailsDialog from "./DetailsDialog";
import { Span } from "../../../shared/components/Span";
import { fetchTravel } from "../../../redux/reducers/travelReducer";
import { logger } from "@sentry/utils";
import List from "../../../shared/components/List";
import { FILTER_OPTIONS } from "../../../shared/constant";
import { dynamicColumns, getTableValue } from "../../../shared/utils/utils";



 /**
 * Renders Delivery List Component
 * Display the table with all the on going delivery list.
 * Volunteer who has shown interest on any customer's order
 * can check the record here
 * @returns JSX Element
 */

export const DeliveryList = () => {

  /** Ref && Dispatch hooks */
  const toast = useRef(null);
  const dispatch = useDispatch();


  /** Selector hooks */
  const loading = useSelector((state) => state.delivery.loading);
  const orders = useSelector((state) => state.delivery.orders);
  const travel = useSelector((state) => state.travel.travel);
  const user = useSelector((state) => state.login.user);


  /** State hooks */
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    delivery: { name: "" },
    pickup: { name: "" },
    volunteer: "",
    volunteerName: "",
    status: ""
  });


  /** Effect hooks*/
  useEffect(() => {

    dispatch(fetchDeliveries(user.id)); // Dispatching action for fetching Delivery Orders.

    dispatch(fetchTravel(user.id)); // Dispatching action for fetching Travel Plans for volunteers.

  }, [dispatch, user]);


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
        <Span className="p-column-title">{header}</Span>
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
  const cityTemplate = (item, {field, header}) => {

    return loading ? (

      <Skeleton key={field} />

    ) : (

      <React.Fragment>
        <Span className="p-column-title">{header}</Span>
        {item[field]["name"]}
      </React.Fragment>

    );
  };

   /** Templates for Item Values in Data Table
   * @param item - data to populate table column 
   * @param field - unique column identifier
   * @returns JSX Element
   */
  const actionBodyTemplate = (item, {field}) => {

    /** This function will be called on click of Action buttons to initialize Dialog Data */
    const clickHandler = () => {

      setModalData({ ...item });
      
      setShowModal(true);
    };

    return loading ? (

      <Skeleton key={field} />

    ) : (
      
      <React.Fragment>
        {
          item.volunteer === "" ? (

            <TextButton
              p={1}
              width="auto"
              radius={4}
              label="Details"
              onClick={clickHandler}
            />
          
          ) : (

            <Label color='error'>Not available</Label>

          )
        }
      </React.Fragment>
      
    );
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
    {
      field: "pickup",
      header: "Pickup Address",
      body: cityTemplate,
      width: 40,
    },
    {
      field: "delivery",
      header: "Delivery Address",
      body: cityTemplate,
      width: 40,
    },
    { field: "itemType", header: "Item", body: bodyTemplate, width: 20 },
    { field: "weight", header: "Weight", body: bodyTemplate, width: 20 },
    { field: "action", header: "Action", body: actionBodyTemplate, width: 30 },
  ];


  /** Handler to hide the Dialog */
  const hideHandler = () => {

    setShowModal(false);

  };


  /** Handler for Interested Button in Details Dialog */
  const interestHandler = () => {

    // Return if empty Travel Plans
    if (travel.active.length === 0) {

      toast.current.show({

        severity: "info",
        summary: "Team DELIVRE",
        detail: "Please create your Travel Plan first",
        life: 3000,

      });

      return;
    }
    

    /** Assign User Data (who clicks on Interested) to Volunteer property */

    modalData.volunteer = user.id; 

    modalData.volunteerName = user.name;

    modalData.status = "Action";
    
    // Dispatch Action for Updating Delivery Order
    dispatch(updateDelivery(modalData))
      .unwrap()
      .then(() => {

        setShowModal(false);
        
      })
      .catch((rejectedValueOrSerializedError) => {

          logger.error("Could not update Delivery", rejectedValueOrSerializedError);

      });

  };


 

  return (
    <React.Fragment>

      <List title='Delivery List' 
        globalFilter={globalFilter} 
        setGlobalFilter={setGlobalFilter} 
        textButtons={FILTER_OPTIONS} 
        setFilterOption={setFilterOption} 
        getTableValue={() => getTableValue(orders, filterOption)}
        dynamicColumns={() => dynamicColumns(columns)}
      />

      <DetailsDialog
        loading={loading}
        modalData={modalData}
        showModal={showModal}
        interestHandler={interestHandler}
        hideHandler={hideHandler}
      />
      
      <Toast ref={toast} position="top-left" />

  </React.Fragment>
  );
};
