import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { google, search, location, rupee, exchange, truck, hands, circle, fb ,insta,yt} from "./IconsAll";

export const GoogleIcon = ({ color }) => {
  return <FontAwesomeIcon icon={google} color={color}/>;
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

export const CircleIcon = ({ color, size }) => {
  return <FontAwesomeIcon icon={circle} color={color} size={size}/>;
};
export const FacebookIcon = ({ color ,size}) => {
  return <FontAwesomeIcon icon={fb} color={color} size={size}/>;
};
export const InstaIcon = ({ color,size }) => {
  return <FontAwesomeIcon icon={insta} color={color} size={size}/>;
};
export const YoutubeIcon = ({ color,size }) => {
  return <FontAwesomeIcon icon={yt} color={color} size={size}/>;
};