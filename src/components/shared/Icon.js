import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { google, search, location, rupee } from "./IconsAll";
import React from "react";

export const GoogleIcon = ({ color }) => {
  return <FontAwesomeIcon icon={google} color={color} />;
};
export const SearchIcon = ({ color }) => {
  return <FontAwesomeIcon icon={search} color={color} />;
};
export const LocationIcon = ({ color }) => {
  return <FontAwesomeIcon icon={location} color={color} />;
};
export const RupeeIcon = ({ color }) => {
  return <FontAwesomeIcon icon={rupee} color={color} />;
};
