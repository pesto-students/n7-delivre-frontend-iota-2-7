import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { google, search, location, rupee, exchange, truck, hands, circle, fb ,insta,yt} from "./IconsAll";

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

export const ExchangeIcon = ({ color }) => {
  return <FontAwesomeIcon icon={exchange} color={color} />;
};

export const TruckIcon = ({ color }) => {
  return <FontAwesomeIcon icon={truck} color={color} />;
};

export const HandsIcon = ({ color }) => {
  return <FontAwesomeIcon icon={hands} color={color} />;
};

export const CircleIcon = ({ color }) => {
  return <FontAwesomeIcon icon={circle} color={color} size="5x"/>;
};
export const FacebookIcon = ({ color }) => {
  return <FontAwesomeIcon icon={fb} color={color} size="2x"/>;
};
export const InstaIcon = ({ color }) => {
  return <FontAwesomeIcon icon={insta} color={color} size="2x"/>;
};
export const YoutubeIcon = ({ color }) => {
  return <FontAwesomeIcon icon={yt} color={color} size="2x"/>;
};