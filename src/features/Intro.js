import React from "react";
import { Div } from "../shared/components/Div";
import { Image } from "../shared/components/Image";
import { InputText } from "../shared/components/Input";
import { PrimaryButton } from "../shared/components/Button";
import { Heading } from "../shared/components/Heading";
import { TabMenu } from "primereact/tabmenu";
import { useState } from "react";
import { Label } from "../shared/components/Label";
import { Span } from "../shared/components/Span";

const items = [{ label: "Delivery" }, { label: "Be Volunteer" }];

export default React.memo(function Intro({handleOnClick}) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Div>
      <Div display="flex" justifyContent="space-around">
        <Image w={[1, "auto"]} src="https://firebasestorage.googleapis.com/v0/b/delivre-6843b.appspot.com/o/banner.svg?alt=media&token=14f66445-aa1a-48a2-9249-818e190b9ced" alt="Banner" />
        <Div diplay="flex" flexDirection="column">
          <Heading size="big"> Fastest Delivery Service </Heading>
          <Label size="small">Low-priced same day delivery service!</Label>
          <Div shadow display="grid" mt={20}>
            <TabMenu
              model={items}
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            />

            <InputText
              m={2}
              width="auto"
              border="true"
              type="text"
              placeholder={activeIndex === 0? "Pickup Address": 'From'} 
            />

            <InputText
              m={2}
              border="true"
              type="text"
              placeholder={activeIndex === 0? "Delivery Address": 'To'} 
            />
            <PrimaryButton m={2} radius="15" label={activeIndex === 0? "Book a courier": 'Book travel plan'} onClick={handleOnClick} />
          </Div>
        </Div>
      </Div>
      <Div>
        <Heading size="medium" textAlign="center">
          Why choose Delivre?
        </Heading>
        <Div display="grid" gridTemplateColumns="1fr 1fr" mt={10}>
          <Image src="https://firebasestorage.googleapis.com/v0/b/delivre-6843b.appspot.com/o/d1.svg?alt=media&token=d08eca1a-d04f-4163-ba0f-37148609f0fc" alt="" m="auto" />
          <Span lineHeight='3' m='auto'>
            <ul>
              <li>
                <Label>Easy and Faster Delivery</Label>
              </li>
              <li>
                <Label>Reduce Shipping Cost & Increase Reach</Label>
              </li>
              <li>
                <Label>Integration with top 17 courier partners</Label>{" "}
              </li>
              <li>
                <Label>Deliver to 29000</Label>
              </li>
              <li>
                <Label>serviceable pin codes in India & 220 countries*</Label>
              </li>
              <li>
                <Label>
                  Lower return costs as compared to forward charges{" "}
                </Label>
              </li>
              <li>
                <Label>Maximum insurance coverage for lost shipments</Label>
              </li>
            </ul>
          </Span>
        </Div>
        <Div display="grid" gridTemplateColumns="1fr 1fr" mt={10}>
          <Span lineHeight='3' m='auto'>
            <ul>
              <li>
                <Label>Easy and Faster Delivery</Label>
              </li>
              <li>
                <Label>Reduce Shipping Cost & Increase Reach</Label>
              </li>
              <li>
                <Label>Integration with top 17 courier partners</Label>{" "}
              </li>
              <li>
                <Label>Deliver to 29000</Label>
              </li>
              <li>
                <Label>serviceable pin codes in India & 220 countries*</Label>
              </li>
              <li>
                <Label>
                  Lower return costs as compared to forward charges{" "}
                </Label>
              </li>
              <li>
                <Label>Maximum insurance coverage for lost shipments</Label>
              </li>
            </ul>
          </Span>
          <Image src="https://firebasestorage.googleapis.com/v0/b/delivre-6843b.appspot.com/o/d2.svg?alt=media&token=80e91e14-63c4-4b7c-80a8-06a18476c33f" alt="" m="auto" />

        </Div>
        <Div display="grid" gridTemplateColumns="1fr 1fr" mt={10}>
          <Image src="https://firebasestorage.googleapis.com/v0/b/delivre-6843b.appspot.com/o/d3.svg?alt=media&token=bba3b476-2aa0-4153-807d-5d754cdfa326" alt="" m="auto" />
          <Span lineHeight='3' m='auto'>
            <ul>
              <li>
                <Label>Easy and Faster Delivery</Label>
              </li>
              <li>
                <Label>Reduce Shipping Cost & Increase Reach</Label>
              </li>
              <li>
                <Label>Integration with top 17 courier partners</Label>{" "}
              </li>
              <li>
                <Label>Deliver to 29000</Label>
              </li>
              <li>
                <Label>serviceable pin codes in India & 220 countries*</Label>
              </li>
              <li>
                <Label>
                  Lower return costs as compared to forward charges{" "}
                </Label>
              </li>
              <li>
                <Label>Maximum insurance coverage for lost shipments</Label>
              </li>
            </ul>
          </Span>
        </Div>
      </Div>
    </Div>
  );
})

// export default Intro
