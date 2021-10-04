import React from "react";
import { Label } from "./Label";

const Error = ({ formik, name }) => {
  return (
    <>
      {formik.touched[name] && formik.errors[name] ? (
        <Label size="small" color="error">
          {formik.errors[name]}
        </Label>
      ) : null}
    </>
  );
};

export default Error;
