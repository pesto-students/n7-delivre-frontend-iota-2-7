import React from "react";
import { Carousel } from "../components/shared/Carousel";

export default {
  title: "Components/Carousel",
};

const products = [{ name: "Image1" }, { name: "Image2" }];
const responsiveOptions = [
  {
    breakpoint: "1024px",
    numVisible: 1,
    numScroll: 3,
  },
  {
    breakpoint: "600px",
    numVisible: 1,
    numScroll: 2,
  },
  {
    breakpoint: "480px",
    numVisible: 1,
    numScroll: 1,
  },
];

const productTemplate = (product) => (
  <img
    src="https://images.unsplash.com/photo-1572195577046-2f25894c06fc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVsaXZlcnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    alt={product.name}
    className="product-image"
  />
);

export const CarouselDefault = () => (
  <Carousel
    value={products}
    numVisible={1}
    responsiveOptions={responsiveOptions}
    itemTemplate={productTemplate}
  />
);
