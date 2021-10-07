import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from "../../../../shared/utils/test-utils";
import {
  CreateOrder,
} from "../../../orders/components/CreateOrder";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint

const order = [
  {
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
  },
];

export const handlers = [
  rest.post(
    "http://localhost:5000/delivre-6843b/us-central1/api/orders",
    (req, res, ctx) => {
      return res(ctx.json(order), ctx.delay(150));
    }
  ),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("Handle submit to be called once", async () => {
  const submit = jest.fn().mockImplementation((cb) => () => cb({test: 'test'}));

  const { container } = render(<CreateOrder />);

  //   userEvent.type(screen.getByPlaceholderText(/Select a City/i), 'Bangalore')
  userEvent.type(screen.getAllByLabelText(/10-digit mobile/i)[0], "9883123724");
  userEvent.type(screen.getAllByLabelText(/Complete Address/i)[0], "bangalore");
  userEvent.type(screen.getAllByLabelText(/10-digit mobile/i)[1], "9883123724");
  userEvent.type(screen.getAllByLabelText(/Complete Address/i)[1], "bangalore");
  userEvent.type(
    screen.getByPlaceholderText(/What are you sending?/i),
    "Document"
  );
  userEvent.type(screen.getByPlaceholderText(/Parcel Value/i), "2000");

  await act( () =>
    fireEvent.click(screen.getByRole("button", { name: /Submit Order/i }))
  );
  await waitFor(() =>
    //   fireEvent.click(screen.getByRole("button", { name: /Submit Order/i }))
    expect(submit).toHaveBeenCalledTimes(1)
  );
  //   console.log(submit);

  //   expect(submit.mockImplementation()).toHaveBeenCalledTimes(1);
  //   expect(screen.queryByText(/Document/i)).toBeInTheDocument();
});
