import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../../../shared/components/Container";
import { Div } from "../../../shared/components/Div";
import FilterButtons from "../../../shared/components/FilterButtons";
import { Heading } from "../../../shared/components/Heading";
import { NavBar } from "../../../shared/components/Navbar";
import { Section } from "../../../shared/components/Section";
import { Skeleton } from "../../../shared/components/Skeleton";
import { Span } from "../../../shared/components/Span";
import { Table } from "../../../shared/components/Table";
import {fetchVolunteer} from '../../../redux/reducers/volunteerReducer';

function VolunteerList() {
    const dispatch = useDispatch();
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
  
    // templates
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
  
    const getValue = () => {
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
            Volunteer List
          </Heading>

          <FilterButtons textButtons={textButtons} handler={setFilterOption} />

          <Div mt={40} borderRadius={5} shadow>
            <Table
              width="auto"
              value={getValue()}
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
    </Section>
  );
}

export default VolunteerList;
