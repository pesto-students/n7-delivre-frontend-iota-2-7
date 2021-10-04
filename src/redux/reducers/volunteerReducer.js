import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApi } from "../../shared/api/crud";

export const fetchVolunteer = createAsyncThunk(
  "volunteer/fetchDeliveries",
  async (payload, thunkAPI) => {
    const response = await fetchApi(payload, "volunteer");
    console.log("Response from API", response);
    const orders = {
      all: response,
      active: response.filter(
        (res) => res.status === "Payment" || res.status === "Track"
      ),
      completed: response.filter((res) => res.status === "Completed"),
    };
    return orders;
  }
);

function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
}

export const volunteerSlice = createSlice({
  name: "volunteer",
  initialState: {
    orders: { all: [], active: [], completed: [] },
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchVolunteer.pending, (state) => {
        // Add user to the state array
        // state.orders.push(...action.payload);
        return updateObject(state, { loading: true });
      })
      .addCase(fetchVolunteer.fulfilled, (state, action) => {
        // Add user to the state array
        // state.orders.push(...action.payload);
        return updateObject(state, { orders: action.payload, loading: false });
      });
  },
});

// Action creators are generated for each case reducer function
export const { createVolunteer } = volunteerSlice.actions;

export default volunteerSlice.reducer;
