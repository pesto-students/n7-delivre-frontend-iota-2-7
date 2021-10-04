import React from "react";
import { TextButton } from "../shared/components/Button";
import { Card } from "../shared/components/Card";
import { Timeline } from "../shared/components/Timeline";

export default {
  title: "Components/Timeline",
};

const events1 = [
  {
    status: "Ordered",
    date: "15/10/2020 10:30",
  },
  {
    status: "Processing",
    date: "15/10/2020 14:00",
  },
  {
    status: "Shipped",
    date: "15/10/2020 16:15",
  },
  {
    status: "Delivered",
    date: "16/10/2020 10:00",
  },
];

const customizedContent = (item) => {
  return (
    <Card title={item.status} subTitle={item.date}>
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
    </Card>
  );
};
export const TimelineDefault = () => (
  <Timeline value={events1} align="alternate" content={customizedContent} />
);
