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


const customizedMarker = () => {
  return (
    <Span>
      <CircleIcon color="var(--secondary)" size="3x"/>
    </Span>
  );
};

function TrackOrders() {

  /** Params hook */
  const { orderId } = useParams();

  /** Dispatch hooks */
  const dispatch = useDispatch();
  
  /** Selector hooks */
  const user = useSelector((state) => state.login.user);
  const orders = useSelector((state) => state.order.orders.active);
  
  const trackingOrders = orders.filter(
    (order) => order.status === "Track" && order.id === orderId
  );
  
  /** State hooks */
  const [ordersToTrack, setOrdersToTrack] = useState(trackingOrders);
  const [events, setEvents] = useState(['Ordered', 'Awaiting', 'Awaiting', 'Awaiting'])
  

  /** Effect hooks */
  useEffect(() => {

    dispatch(fetchOrders(user.id));
  
  }, [dispatch, user]);

  useEffect(() => {

    setTimeout(() => {
      setEvents(['Ordered', 'Picked','Awaiting', 'Awaiting'])
    },5000)

    setTimeout(() => {
      setEvents(['Ordered', 'Picked', 'On Route','Awaiting'])
    },10000)
    
    setTimeout(() => {
      setEvents(['Ordered', 'Picked', 'On Route', 'Delivered'])
    },15000)

  },[]);

  
  //Handler for filtering order history
  const orderHistory = () => {
    const trackingOrders = orders.filter((order) => order.status === "Track");
    setOrdersToTrack(trackingOrders);
  };
  
  
  return (
    <Section>
      <NavBar />

      <Container width={["1", "auto"]}>
        <PrimaryOutlinedButton mt={4} label="Order History" onClick={orderHistory} />
        {ordersToTrack.map((order) => (
          <Div key={order.id}>

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
              gridTemplateColumns="1fr 2fr"
            >
              <Div display="grid">

                <Heading size="medium" weight="hairline" mb={40}>
                  Courier
                </Heading>

                <Label weight="bold"> Volunteer</Label>

                <Label>{order.volunteerName}</Label>
                
                <Label weight="bold" mt={2}>
                  Contact
                </Label>
                
                <Label>{order.pickupMobile}</Label>
              </Div>
              
              <Div display="grid">
                
                <Heading size="medium" weight="hairline" mb={40}>
                  Order Details
                </Heading>
                
                <Span display="flex">
                  
                  <Div display="flex" flexDirection="column">
                    
                    <Label weight="bold">Declared value</Label>
                    
                    <Label>{order.itemValue}</Label>
                    
                    <Label weight="bold" mt={2}>
                      Payment type
                    </Label>
                    
                    <Label>Card</Label>
                  </Div>
                  
                  <Div display="flex" flexDirection="column">
                    
                    <Label weight="bold">Content</Label>
                    
                    <Label>{order.itemType}</Label>
                    
                    <Label weight="bold" mt={2}>
                      Weight
                    </Label>
                    
                    <Label>upto {order.weight} kg</Label>
                  
                  </Div>
                
                </Span>
              
              </Div>
            </Div>

          </Div>
        ))}
      </Container>
    </Section>
  );
}

export default TrackOrders;
