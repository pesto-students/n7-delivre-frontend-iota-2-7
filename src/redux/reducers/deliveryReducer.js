import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApi, updateApi } from "../../shared/api/crud";

export const fetchDeliveries = createAsyncThunk(
  "delivery/fetchDeliveries",
  async (payload) => {
    const response = await fetchApi(payload, "delivery");
    console.log("Response from API", response);
    const orders = {
      all: response,
      active: response.filter(
        (res) => res.volunteer === ""
      ),
      completed: response.filter((res) => res.status === "Completed"),
    };
    return orders;
  }
);
export const updateDelivery = createAsyncThunk(
  "delivery/updateDelivery",
  async (payload) => {
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
  const orders = {
    all: updatedItems,
    active: updatedItems.filter((res) => res.status === "Assigned"),
    completed: updatedItems.filter((res) => res.status === "Completed"),
  };

  return orders;
}

export const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    orders: { all: [], active: [], completed: [] },
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchDeliveries.pending, (state) => {
        // Add user to the state array
        // state.orders.push(...action.payload);
        return updateObject(state, { loading: true });
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        // Add user to the state array
        // state.orders.push(...action.payload);
        return updateObject(state, { orders: action.payload, loading: false });
      })
      .addCase(updateDelivery.fulfilled, (state, action) => {
        return updateObject(state, {
          orders: updateItemInArray(state.orders.all, action.payload),
        });
      });
  },
});

export default deliverySlice.reducer;
