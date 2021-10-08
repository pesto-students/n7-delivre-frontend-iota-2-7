import React, { useEffect, useState } from "react";
import { Div } from "../../../shared/components/Div";
import { Container } from "../../../shared/components/Container";
import { Heading } from "../../../shared/components/Heading";
import { Section } from "../../../shared/components/Section";
import { Skeleton } from "../../../shared/components/Skeleton";
import { NavBar } from "../../../shared/components/Navbar";
import { Table } from "../../../shared/components/Table";
import { Column } from "primereact/column";
import { useSelector, useDispatch } from "react-redux";
import FilterButtons from "../../../shared/components/FilterButtons";
import { fetchTravel } from "../../../redux/reducers/travelReducer";



export const TravelList = () => {
  const dispatch = useDispatch();
  const travel = useSelector((state) => state.travel.travel);
  const loading = travel.loading;
  const user = useSelector((state) => state.login.user);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  useEffect(() => {
    dispatch(fetchTravel(user.id));
  }, [dispatch, user]);

  const bodyTemplate = (data, props) => {
    return loading ? <Skeleton key={props.field} />:(
      <React.Fragment>
        <span className="p-column-title">{props.header}</span>
        {data[props.field]}
      </React.Fragment>
    );
  };
  const cityTemplate = (data, props) => {
      console.log(data[props.field]['name']);
    return loading ? <Skeleton key={props.field} />:(
      <React.Fragment>
        <span className="p-column-title">{props.header}</span>
        {data[props.field]['name']}
      </React.Fragment>
    );
  };

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
    { field: "departureDate", header: "Departure Date", body: bodyTemplate, width:20},
    {
      field: "mobile",
      header: "Contact",
      body: bodyTemplate,
      
    },
    { field: "currentAddress", header: "Address", body: bodyTemplate, width:30},
    { field: "weight", header: "Weight", body: bodyTemplate, },
    { field: "status", header: "Status", body: bodyTemplate, },
  ];

  
  const dynamicColumns = columns.map((col) => {
     return ( <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        sortable={col.sortable}
        style={{ width: col.width + "%" }}
      />
    )}
  );

  const textButtons = [
    { label: "All Orders", filterValue: "all" },
    { label: "Active", filterValue: "active" },
    { label: "Completed", filterValue: "completed" },
    { label: "Drafts", filterValue: "all" },
  ];

  const getValue = () => {
    switch (filterOption) {
      case "all":
        return travel.all;
      case "active":
        return travel.active;
      case "completed":
        return travel.completed;
      default:
        return travel.all;
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
            Travel List
          </Heading>

          <FilterButtons textButtons={textButtons} handler={setFilterOption} />

          <Div mt={40} borderRadius={5} shadow>
            <Table
              width="auto"
              value={getValue()}
              paginator
              rows={5}
              rowHover
              resizableColumns
              columnResizeMode="expand"
              globalFilter={globalFilter}
              emptyMessage="No travel plans yet."
            >
              {dynamicColumns}
            </Table>
          </Div>
        </Div>
      </Container>
    </Section>
  );
};
