import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import  { store, persistor}  from "./redux/configureStore";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { PersistGate } from 'redux-persist/integration/react'
import "./index.css";

Sentry.init({
  dsn: "https://3939ac3238144603b495ecc002f10326:f123dae657b74928b32ffa97da85aabf@o1008112.ingest.sentry.io/5971623",

  integrations: [new Integrations.BrowserTracing()],
  attachStacktrace: true,
  tracesSampleRate: 1.0,
});

// const store = configureStore;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
