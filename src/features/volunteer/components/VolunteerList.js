import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "../../../shared/components/Skeleton";
import { Span } from "../../../shared/components/Span";
import {fetchVolunteer} from '../../../redux/reducers/volunteerReducer';
import { FILTER_OPTIONS } from "../../../shared/constant";
import { dynamicColumns, getTableValue } from "../../../shared/utils/utils";
import List from "../../../shared/components/List";




function VolunteerList() {

    //disptach hooks
    const dispatch = useDispatch();

    // selector hooks
    const loading = useSelector((state) => state.volunteer.loading);
    const orders = useSelector((state) => state.volunteer.orders);
    const user = useSelector((state) => state.login.user);
  
    // state hooks
    const [globalFilter, setGlobalFilter] = useState("");
    const [filterOption, setFilterOption] = useState("all");
  
    // effect hooks
    useEffect(() => {

      dispatch(fetchVolunteer(user.id));
      
    }, [dispatch, user]);



  
    /** Templates for Item Values in Data Table
    * @param item - data to populate table column
    * @param field - unique column identifier
    * @param header - column header name
    * @returns JSX Element
    */
    const bodyTemplate = (data, props) => {
      return loading ? (
        <Skeleton key={props.field} />
      ) : (
        <React.Fragment>
          <Span  className="p-column-title">{props.header}</Span>
          {data[props.field]}
        </React.Fragment>
      );
    };




    /** Templates for Item Values in Data Table
    * @param item - data to populate table column
    * @param field - unique column identifier
    * @param header - column header name
    * @returns JSX Element
    */
    const cityTemplate = (data, props) => {
      return loading ? (
        <Skeleton key={props.field} />
      ) : (
        <React.Fragment>
          <Span className="p-column-title">{props.header}</Span>
          {data[props.field]["name"]}
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
    { field: "status", header: "Action", body: bodyTemplate, width: 30 },
  ];
  
  
    
  return (
    <List 
        title='Volunteer List' 
        globalFilter={globalFilter} 
        setGlobalFilter={setGlobalFilter} 
        textButtons={FILTER_OPTIONS} 
        setFilterOption={setFilterOption} 
        getTableValue={() => getTableValue(orders, filterOption)}
        dynamicColumns={() => dynamicColumns(columns)}
      />
  );
}

export default VolunteerList;
