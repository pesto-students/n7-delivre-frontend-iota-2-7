import React from "react";
import { rest } from "msw";
import { setupServer } from 'msw/node'
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen,create } from "../../../../shared/utils/test-utils";
import OrderList from "../../../orders/components/OrderList";


// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
const order = [{
  weight: "1",
  volunteer: "wv1wQDCKccW0lslR1WsnH7u4Tbu2",
  created: "Tue Oct 05 2021",
  pickup: {
    code: "BLR",
    name: "Bangalore",
  },
  deliveryBag: true,
  pickupAddress:
    "BD-37 Rabindrapally, Kestopur\nFlat 1C Block 10, Natural Green Complex",
  pickupMobile: 9883123724,
  user: "vrhaW6y0Q2WqL7nfzXeClRxSpPv2",
  volunteerName: "Shubham Agarwal",
  paymentId: "pi_3JhKcYSCi4fqL8uy1hOLGF7y",
  deliveryMobile: 9883123724,
  deliveryAddress:
    "BD-37 Rabindrapally, Kestopur\nFlat 1C Block 10, Natural Green Complex",
  deliveryPartner: "dunzo",
  status: "Track",
  id: "6311-534289-7870",
  delivery: {
    code: "BLR",
    name: "Bangalore",
  },
  itemValue: "2000",
  price: 86,
  itemType: "Food",
  username: "Shubham Agarwal",
}];
export const handlers = [
  rest.get("http://localhost:5000/delivre-6843b/us-central1/api/orders/guest140994", (req, res, ctx) => {
    return res(ctx.json(order), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("fetches & receives a orders after loading", async () => {

  render(<OrderList />);

  // should show no user initially, and not be fetching a user
  //   expect(screen.getByText(/no user/i)).toBeInTheDocument()
  //   expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()

  //   // after clicking the 'Fetch user' button, it should now show that it is fetching the user
  //   fireEvent.click(screen.getByRole('button', { name: /Fetch user/i }))
  //   expect(screen.getByText(/no user/i)).toBeInTheDocument()

  // after some time, the user should be received
  expect(await screen.findByText(/6311-534289-7870/i)).toBeInTheDocument();
  expect(screen.queryByText(/No orders/i)).not.toBeInTheDocument();
  //   expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()
});

// describe("OrderList component", () => {
//   test("Order Complete", () => {
//     const component = create(<OrderList/>);
//     const instance = component.getInstance();
  
//     instance.orderComplete();
//     // expect(instance.state.text).toBe("PROCEED TO CHECKOUT");
//   });
// });