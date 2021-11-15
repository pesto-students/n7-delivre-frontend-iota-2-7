import React, { useEffect, useState } from "react";
import { Skeleton } from "../../../shared/components/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { fetchTravel } from "../../../redux/reducers/travelReducer";
import List from "../../../shared/components/List";
import { FILTER_OPTIONS } from "../../../shared/constant";
import { dynamicColumns, getTableValue } from "../../../shared/utils/utils";

export const TravelList = () => {
  /** Disptach hook */
  const dispatch = useDispatch();

  /** Selector hooks */
  const travel = useSelector((state) => state.travel.travel);
  const user = useSelector((state) => state.login.user);
  const loading = travel.loading;

  /** State hooks */
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterOption, setFilterOption] = useState("all");

  /** Effect hooks */
  useEffect(() => {
    dispatch(fetchTravel(user.id));
  }, [dispatch, user]);

 
 
  /** Templates for Item Values in Data Table
   * @param item - data to populate table column
   * @param field - unique column identifier
   * @param header - column header name
   * @returns JSX Element
   */
  const bodyTemplate = (item, { field, header }) => {
    return loading ? (
      <Skeleton key={field} />
    ) : (
      <>
        <span className="p-column-title">{header}</span>
        {item[field]}
      </>
    );
  };




  /** Templates for Item Values in Data Table
   * @param item - data to populate table column
   * @param field - unique column identifier
   * @param header - column header name
   * @returns JSX Element
   */
  const cityTemplate = (item, { field, header }) => {
    return loading ? (
      <Skeleton key={field} />
    ) : (
      <>
        <span className="p-column-title">{header}</span>
        {item[field]["name"]}
      </>
    );
  };


  /** Columns definition for Data Table */
  const columns = [
    {
      field: "from",
      header: "From",
      body: cityTemplate,
    },
    {
      field: "to",
      header: "To",
      body: cityTemplate,
    },
    {
      field: "departureDate",
      header: "Departure Date",
      body: bodyTemplate,
      width: 20,
    },
    {
      field: "mobile",
      header: "Contact",
      body: bodyTemplate,
    },
    {
      field: "currentAddress",
      header: "Address",
      body: bodyTemplate,
      width: 30,
    },
    { field: "weight", header: "Weight", body: bodyTemplate },
    { field: "status", header: "Status", body: bodyTemplate },
  ];


  return (
    <List
      title="Travel List"
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      textButtons={FILTER_OPTIONS}
      setFilterOption={setFilterOption}
      getTableValue={() => getTableValue(travel, filterOption)}
      dynamicColumns={() => dynamicColumns(columns)}
    />
  );
};
