import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchApi, updateApi } from "../../shared/api/crud";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (payload, thunkAPI) => {
    const response = await createApi(payload, "orders");
    console.log(response);
    return response;
  }
);

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (payload, thunkAPI) => {
    const response = await fetchApi(payload, "orders");
    // console.log("Response from API", response);
    const orders = {
      all: response,
      active: response.filter(
        (res) =>
          res.status === "Assigned" ||
          res.status === "Action" ||
          res.status === "Payment" ||
          res.status === "Track"
      ),
      completed: response.filter((res) => res.status === "Completed"),
    };
    return orders;
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (payload, thunkAPI) => {
    console.log("Payload", payload);
    const response = await updateApi(payload, "orders");
    console.log("Response from API", response);
    return response;
  }
);

function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
}

function updateItemInArray(array, item) {
  const updatedItems = array.map((obj) => {
    if (obj.id !== item.id) {
      // Since we only want to update one item, preserve all others as they are now
      return obj;
    }

    // Use the provided callback to create an updated item
    const updatedItem = { ...item };
    return updatedItem;
  });
  console.log("Updated Items", updatedItems);
  const orders = {
    all: updatedItems,
    active: updatedItems.filter(
      (res) =>
        res.status === "Assigned" ||
        res.status === "Action" ||
        res.status === "Payment" ||
        res.status === "Track"
    ),
    completed: updatedItems.filter((res) => res.status === "Completed"),
  };

  return orders;
}

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: { all: [], active: [], completed: [] },
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(createOrder.pending, (state) => {
        // Add user to the state array
        return updateObject(state, { loading: true });
      })
      .addCase(createOrder.fulfilled, (state) => {
        // Add user to the state array
        return updateObject(state, { loading: false });
      })
      .addCase(fetchOrders.pending, (state) => {
        // Add user to the state array
        // state.orders.push(...action.payload);
        return updateObject(state, { loading: true });
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        // Add user to the state array
        // state.orders.push(...action.payload);
        return updateObject(state, { orders: action.payload, loading: false });
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        return updateObject(state, {
          orders: updateItemInArray(state.orders.all, action.payload),
        });
      });
  },
});

// Action creators are generated for each case reducer function
// export const { createOrder } = orderSlice.actions

export default orderSlice.reducer;
