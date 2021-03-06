import { logout } from "../api/login";
import { SearchIcon } from "./Icon";
import { IconInputText, InputText } from "./Input";
import { MenuBar } from "./MenuBar";

const items = [
  {
    label: "List",
    items: [
      {
        label: "Orders List",
        url: "/order-list",
      },
      {
        label: "Delivery List",
        url: "/delivery-list",
      },

      {
        label: "Volunteer List",
        url: "/volunteer-list",
      },
    ],
  },
  {
    label: "Travel Plans",
    url: "/travel-list",
  },
  {
    label: "Account",
    items: [
      {
        label: "Profile",
      },
      {
        label: "Logout",
        command: () => {
          logout();
        },
      },
    ],
  },
];

export const NavBar = ({ value, onChange }) => {
  return (
    <MenuBar
      model={items}
      end={
        <IconInputText>
          <SearchIcon />
          <InputText
            placeholder="Type order number or any other text"
            type="text"
            width={[265, 500, 550, 600, 800]}
            height={50}
            value={value}
            onChange={onChange}
          />
        </IconInputText>
      }
      width="auto"
    />
  );
};
