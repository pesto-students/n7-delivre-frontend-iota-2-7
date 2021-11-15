import React from "react";
import { InputText } from "../shared/components/Input";
import { MenuBar } from "../shared/components/MenuBar";

export default {
  title: "Components/Menu",
};


const items = [
    {
        label: 'List',
        items: [
            {
                label: 'Orders List',
            },
            {
                label: 'Delivery List',
            },
           
            {
                label: 'Volunteer List',
            }
        ]
    },
    {
        label: 'Travel Plans',
        
    },
    {
        label: 'Account',
        items: [
            {
                label: 'Profile',

            },
            {
                label: 'Logout',
            },
            
        ]
    },
    
];

const end = <InputText placeholder="Search" type="text" />;

export const Menu = () => (
    <MenuBar model={items} end={end} />
);
