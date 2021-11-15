import { applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import monitorReducersEnhancer from "./enhancers/monitorReducers";
import loggerMiddleware from "./middleware/logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import  loginSlice  from "./reducers/loginReducer";
import orderSlice from "./reducers/orderReducer";
import  travelSlice  from "./reducers/travelReducer";
import  volunteerSlice  from "./reducers/volunteerReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import deliveryReducer from "./reducers/deliveryReducer";

const persistConfig = {
  key: 'root',
  storage,
}

const middlewares = [loggerMiddleware, thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
const composedEnhancers = compose(...enhancers);

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    login: loginSlice,
    order: orderSlice,
    travel: travelSlice,
    volunteer: volunteerSlice,
    delivery: deliveryReducer
  })),
  enhancers: [composedEnhancers],
});

export const persistor =  persistStore(store);

