import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrders } from "../../redux/reducers/orderReducer";
import { PrimaryOutlinedButton } from "../../shared/components/Button";
import { Container } from "../../shared/components/Container";
import { Div } from "../../shared/components/Div";
import { Heading } from "../../shared/components/Heading";
import { CircleIcon, RupeeIcon } from "../../shared/components/Icon";
import { Label } from "../../shared/components/Label";
import { NavBar } from "../../shared/components/Navbar";
import { Section } from "../../shared/components/Section";
import { Span } from "../../shared/components/Span";
import { Timeline } from "../../shared/components/Timeline";

const events = ["Ordered", "Processing", "Shipped", "Delivered"];

const customizedMarker = () => {
  return (
    <Span>
      <CircleIcon color="var(--secondary)" />
    </Span>
  );
};

function TrackOrders() {
  const { orderId } = useParams();
  console.log(orderId);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const orders = useSelector((state) => state.order.orders.active);
  const trackingOrders = orders.filter(
    (order) => order.status === "Track" && order.id === orderId
  );
  const [ordersToTrack, setOrdersToTrack] = useState(trackingOrders);
  useEffect(() => {
    dispatch(fetchOrders(user.id));
  }, [dispatch, user]);

  useEffect(()=>{})

  const orderHistory = () => {
    const trackingOrders = orders.filter((order) => order.status === "Track");
    setOrdersToTrack(trackingOrders);
  };
  return (
    <Section>
      <NavBar />

      <Container width={["1", "auto"]}>
        {ordersToTrack.map((order) => (
          <React.Fragment>
            <Div>
              <Heading size="big" weight="hairline" mt={40} mb={40}>
                Order #{order.id} - <RupeeIcon /> {order.price}
              </Heading>
              <PrimaryOutlinedButton
                label="Order History"
                onClick={orderHistory}
              />
            </Div>
            <Div>
              <Heading size="medium" weight="bold" mt={40} mb={40}>
                Track Details
              </Heading>
              <Timeline
                layout="horizontal"
                value={events}
                align="top"
                marker={customizedMarker}
                content={(item) => item}
              />
            </Div>
            <Div
              mb={20}
              shadow="true"
              display="grid"
              gridTemplateColumns="1fr 1fr 1fr"
            >
              <Div display="grid">
                <Heading size="medium" weight="hairline" mt={40} mb={40}>
                  Courier
                </Heading>
                <Label weight="bold"> Volunteer</Label>
                <Label>{order.volunteerName}</Label>
                <Label weight="bold" mt={2}>
                  {" "}
                  Contact
                </Label>
                <Label>{order.pickupMobile}</Label>
              </Div>
              <Div display="grid">
                <Heading size="medium" weight="hairline" mt={40} mb={40}>
                  Order Details
                </Heading>
                <Span display="grid" gridTemplateColumns="1fr 1fr">
                  <Span display="flex" flexDirection="column">
                    <Label weight="bold">Declared value</Label>
                    <Label>{order.itemValue}</Label>
                    <Label weight="bold" mt={2}>
                      Payment type
                    </Label>
                    <Label>Card</Label>
                  </Span>
                  <Span display="flex" flexDirection="column">
                    <Label weight="bold">Content</Label>
                    <Label>{order.itemType}</Label>
                    <Label weight="bold" mt={2}>
                      Weight
                    </Label>
                    <Label>upto {order.weight} kg</Label>
                  </Span>
                </Span>
              </Div>
            </Div>
          </React.Fragment>
        ))}
      </Container>
    </Section>
  );
}

export default TrackOrders;
