import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { create as rtrCreate } from "react-test-renderer";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import orderReducer from "../../redux/reducers/orderReducer";
import loginReducer from "../../redux/reducers/loginReducer";

const state = {
  login: { user: { id: "guest140994" } },
};
function render(
  ui,
  {
    preloadedState = state,
    store = configureStore({
      reducer: { order: orderReducer, login: loginReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

function create(
  ui,
  {
    preloadedState = state,
    store = configureStore({
      reducer: { order: orderReducer, login: loginReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtrCreate(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render, create };
