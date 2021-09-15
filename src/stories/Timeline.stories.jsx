import { Card } from "primereact/card";
import React from "react";
import { TextButton } from "../components/shared/Button";
import { BasicCard } from "../components/shared/Card";
import { BasicTimeline } from "../components/shared/Timeline";

export default {
  title: "Components/Timeline",
};

const events1 = [
  {
    status: "Ordered",
    date: "15/10/2020 10:30",
    icon: "pi pi-shopping-cart",
    color: "#9C27B0",
    image: "game-controller.jpg",
  },
  {
    status: "Processing",
    date: "15/10/2020 14:00",
    icon: "pi pi-cog",
    color: "#673AB7",
  },
  {
    status: "Shipped",
    date: "15/10/2020 16:15",
    icon: "pi pi-shopping-cart",
    color: "#FF9800",
  },
  {
    status: "Delivered",
    date: "16/10/2020 10:00",
    icon: "pi pi-check",
    color: "#607D8B",
  },
];
const customizedMarker = (item) => {
  return (
    <span
      className="custom-marker p-shadow-2"
      style={{ backgroundColor: item.color }}
    >
      <i className={item.icon}></i>
    </span>
  );
};

const customizedContent = (item) => {
  return (
    <BasicCard title={item.status} subTitle={item.date}>
      {item.image && (
        <img
          src={`https://primefaces.org/primereact/showcase/showcase/demo/images/product/game-controller.jpg`}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          alt={item.name}
          width={200}
          className="p-shadow-2"
        />
      )}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </p>
      <TextButton label="Read more"></TextButton>
    </BasicCard>
  );
};
export const Timeline = () => (
  <BasicTimeline
    value={events1}
    align="alternate"
    content={customizedContent}
  />
);
