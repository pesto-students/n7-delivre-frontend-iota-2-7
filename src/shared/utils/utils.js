import { logger } from "@sentry/utils";
import { Column } from "primereact/column";
import { createApi } from "../api/crud";

/** E-mail handler to send e-mails to Customer
 * @param {Object} paymentIntent
 */
export const sendEmailToCustomer = async (paymentIntent) => {
  try {
    const response = await createApi(paymentIntent, "sendMail");

    if (response) {
      logger.log("Email Sent", response);
    }
  } catch (err) {
    logger.error(err);
  }
};




/**
 * This method will render the Column data for each header in Data Table
 * @returns List of Column Component
 */
export const dynamicColumns = (columns) =>
  columns.map((col) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        sortable={col.sortable}
        style={{ width: col.width + "%" }}
      />
    );
  });

/** Method to retrive value on filter
 * @param item
 * @param filterOption
 * @returns Orders Collection
 */
export const getTableValue = (item, filterOption) => {
  console.log("Get Table Value ", item);
  switch (filterOption) {
    case "all":
      return item.all;
    case "active":
      return item.active;
    case "completed":
      return item.completed;
    default:
      return item.all;
  }
};
