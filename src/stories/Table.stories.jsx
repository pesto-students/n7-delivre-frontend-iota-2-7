import React from "react";
import { BasicTable } from "../components/shared/Table";
import { Column } from "primereact/column";

export default {
  title: "Components/Table",
};

const data = [
  {
    name: "Shubham",
    code: "101",
    category: "Employee",
    quantity: 1,
  },
];

export const Table = () => (
  <BasicTable value={data} paginator rows={10} rowHover>
    <Column field="name" header="Name"></Column>
    <Column field="code" header="Code"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
  </BasicTable>
);
