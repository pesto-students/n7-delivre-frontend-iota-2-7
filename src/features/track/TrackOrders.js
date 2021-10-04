import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/reducers/orderReducer";
import { Container } from "../../shared/components/Container";
import { Div } from "../../shared/components/Div";
import { Heading } from "../../shared/components/Heading";
import { CircleIcon, RupeeIcon } from "../../shared/components/Icon";
import { Label } from "../../shared/components/Label";
import { NavBar } from "../../shared/components/Navbar";
import { Section } from "../../shared/components/Section";
import { Span } from "../../shared/components/Span";
import { Timeline } from "../../shared/components/Timeline";

const events1 = ["Ordered", "Processing", "Shipped", "Delivered"];

const customizedMarker = (item) => {
  return (
    <Span>
      <CircleIcon color="var(--secondary)" />
    </Span>
  );
};

function TrackOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const orders = useSelector((state) => state.order.orders.active);
  const ordersToTrack = orders.filter((order) => order.status === "Track");
  useEffect(() => {
    dispatch(fetchOrders(user.id));
  }, [dispatch, user]);

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
            </Div>
            <Div>
              <Heading size="medium" weight="bold" mt={40} mb={40}>
                Track Details
              </Heading>
              <Timeline
                layout="horizontal"
                value={events1}
                align="top"
                marker={customizedMarker}
                content={(item) => item}
              />
            </Div>
            <Div shadow="true" display="grid" gridTemplateColumns="1fr 1fr 1fr">
              <Div display="grid">
                <Heading size="medium" weight="hairline" mt={40} mb={40}>
                  Courier
                </Heading>
                <Label weight='bold'> Volunteer</Label>
                <Label>{order.volunteerName}</Label>
                <Label weight='bold' mt={2}> Contact</Label>
                <Label>{order.pickupMobile}</Label>
              </Div>
              <Div display="grid">
                <Heading size="medium" weight="hairline" mt={40} mb={40}>
                  Order Details
                </Heading>
                <Span display="grid" gridTemplateColumns='1fr 1fr'>
                  <Span display="flex" flexDirection="column">
                    <Label weight='bold'>Declared value</Label>
                    <Label>{order.itemValue}</Label>
                    <Label weight='bold' mt={2}>Payment type</Label>
                    <Label>Card</Label>
                  </Span>
                  <Span display="flex" flexDirection="column">
                    <Label weight='bold'>Content</Label>
                    <Label>{order.itemType}</Label>
                    <Label weight='bold' mt={2}>Weight</Label>
                    <Label>{order.weight}</Label>
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
