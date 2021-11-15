// export const BASE_URL = "http://localhost:5000/delivre-6843b/us-central1/api/";
export const BASE_URL = "https://us-central1-delivre-6843b.cloudfunctions.net/api/";

export const CITIES = [
  { name: "Bangalore", code: "BLR" },
  { name: "Chennai", code: "CHN" },
  { name: "Delhi", code: "DL" },
  { name: "Mumbai", code: "MB" },
  { name: "Kolkata", code: "CCU" },
  { name: "Pune", code: "PN" },
];

export const PARTNERS = [
  { label: "Dunzo", value: "dunzo" },
  { label: "Swiggy", value: "swiggy" },
  { label: "WeFast", value: "wefast" },
];

export const WEIGHT_BASE_PRICE = {
  1: 10,
  5: 15,
  10: 20,
  15: 25,
  20: 30,
};
export const DELIVERY_PARTNER_BASE_PRICE = {
  dunzo: 10,
  swiggy: 20,
  wefast: 5,
};

export const CHIPS = [
  { label: "Document", value: "Document" },
  { label: "Food", value: "Food" },
  { label: "Cloth", value: "Cloth" },
  { label: "Groceries", value: "Groceries" },
  { label: "Flowers", value: "Flowers" },
  { label: "Cake", value: "Cake" },
  { label: "Parcel", value: "Parcel" },
];

export const STATUS_COLOR = {
  Assigned: "yellow",
  Action: "red",
  Payment: "blue",
  Track: "primary",
  Confirmed: "primary",
};

export const FILTER_OPTIONS = [
  { label: "All Orders", filterValue: "all" },
  { label: "Active", filterValue: "active" },
  { label: "Completed", filterValue: "completed" },
  { label: "Drafts", filterValue: "all" },
];
