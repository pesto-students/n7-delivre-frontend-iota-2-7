import React, { useEffect, useRef, useState } from "react";
import { Div } from "../../../shared/components/Div";
import { Container } from "../../../shared/components/Container";
import { Heading } from "../../../shared/components/Heading";
import { Section } from "../../../shared/components/Section";
import { Skeleton } from "../../../shared/components/Skeleton";
import { NavBar } from "../../../shared/components/Navbar";
import { Table } from "../../../shared/components/Table";
import { Column } from "primereact/column";
import { TextButton } from "../../../shared/components/Button";
import { Toast } from "primereact/toast";
import { useSelector, useDispatch } from "react-redux";
import FilterButtons from "../../../shared/components/FilterButtons";
import {
  fetchDeliveries,
  updateDelivery,
} from "../../../redux/reducers/deliveryReducer";
import { Label } from "../../../shared/components/Label";
import DetailsDialog from "./DetailsDialog";
import { Span } from "../../../shared/components/Span";
import { fetchTravel } from "../../../redux/reducers/travelReducer";

export const DeliveryList = () => {
  // selector and dispatch hooks
  const toast = useRef(null);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.delivery.loading);
  const orders = useSelector((state) => state.delivery.orders);
  const travel = useSelector((state) => state.travel.travel);
  const user = useSelector((state) => state.login.user);

  // state hooks
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    delivery: { name: "" },
    pickup: { name: "" },
  });

  // effect hooks
  useEffect(() => {
    dispatch(fetchDeliveries(user.id));
    dispatch(fetchTravel(user.id));
  }, [dispatch, user]);

  // templates
  const bodyTemplate = (data, props) => {
    return loading ? (
      <Skeleton key={props.field} />
    ) : (
      <React.Fragment>
        <Span className="p-column-title">{props.header}</Span>
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

  const actionBodyTemplate = (data, props) => {
    const clickHandler = () => {
      setModalData({ ...data });
      setShowModal(true);
    };
    return loading ? (
      <Skeleton key={props.field} />
    ) : (
      <React.Fragment>
        {data.volunteer !== "" ? (
          <Label>Not available</Label>
        ) : (
          <TextButton
            p={1}
            width="auto"
            radius={4}
            label="Details"
            onClick={clickHandler}
          />
        )}
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
    { field: "action", header: "Action", body: actionBodyTemplate, width: 30 },
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
  const hideHandler = () => {
    setShowModal(false);
  };
  const interestHandler = () => {
    if (travel.active.length === 0) {
      toast.current.show({
        severity: "info",
        summary: "Team DELIVRE",
        detail: "Please create your Travel Plan first",
        life: 3000,
      });
      return;
    }
    modalData.volunteer = user.id;
    modalData.volunteerName = user.name;
    modalData.status = "Action";
    dispatch(updateDelivery(modalData))
      .unwrap()
      .then((originalPromiseResult) => {
        console.info("Interested Handler Response", originalPromiseResult);
        setShowModal(false);
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.info(rejectedValueOrSerializedError);
      });
  };

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
            Delivery List
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
      <DetailsDialog
        loading={loading}
        modalData={modalData}
        showModal={showModal}
        interestHandler={interestHandler}
        hideHandler={hideHandler}
      />
      <Toast ref={toast} position="top-left" />
    </Section>
  );
};
