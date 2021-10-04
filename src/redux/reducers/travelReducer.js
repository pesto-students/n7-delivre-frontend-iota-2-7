import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchApi } from "../../shared/api/crud";

export const createTravel = createAsyncThunk(
  "travel/createTravel",
  async (payload, thunkAPI) => {
    const response = await createApi(payload, "travel");
    console.log(response);
    return response;
  }
);
export const fetchTravel = createAsyncThunk(
  "travel/fetchTravel",
  async (payload, thunkAPI) => {
    const response = await fetchApi(payload, "travel");
    console.log("Response from API", response);
    const travel = {
      all: response,
      active: response.filter((res) => res.status === "Active"),
      completed: response.filter((res) => res.status === "Completed"),
    };
    return travel;
  }
);
function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
}

export const travelSlice = createSlice({
  name: "travel",
  initialState: {
    travel: { all: [], active: [], completed: [] },
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(createTravel.pending, (state) => {
        // Add user to the state array
        return updateObject(state, { loading: true });
      })
      .addCase(createTravel.fulfilled, (state) => {
        // Add user to the state array
        return updateObject(state, { loading: false });
      })
      .addCase(fetchTravel.pending, (state) => {
        return updateObject(state, { loading: true });
      })
      .addCase(fetchTravel.fulfilled, (state, action) => {
        return updateObject(state, { travel: action.payload, loading: false });
      });
  },
});

export default travelSlice.reducer;
