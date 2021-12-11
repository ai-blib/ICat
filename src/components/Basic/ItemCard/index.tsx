import React from "react";
import {
   Card,
   Rectangle52,
   FlexWrapperOne,
   Dfirocks123,
   RelativeWrapperOne,
   Num2999,
   Vector,
   FlexWrapperTwo,
   Dfirock,
   Icp,
   FlexWrapperThree,
   Group13,
   Ellipse80,
   Creator,
   Group11,
   BuyNow
} from "./styles";

const CardComponent = () => {
   return (
      <Card>
         <Rectangle52
            alt=""
            src="https://static.overlay-tech.com/assets/1416c97d-32de-4f7e-993a-f5fc7a7362b7.png"
         />
         <FlexWrapperOne>
            <Dfirocks123>DFIROCKS#123</Dfirocks123>
            <RelativeWrapperOne>
               <Num2999>2999</Num2999>
               <Vector
                  alt=""
                  src="https://static.overlay-tech.com/assets/1b0b1ec9-a3cd-4c79-a1fd-62073083a110.svg"
               />
            </RelativeWrapperOne>
         </FlexWrapperOne>
         <FlexWrapperTwo>
            <Dfirock>DFIROCK</Dfirock>
            <Icp>ICP</Icp>
         </FlexWrapperTwo>
         <FlexWrapperThree>
            <Group13>
               <Ellipse80 />
               <Creator>Creator</Creator>
            </Group13>
            <Group11>
               <BuyNow>Buy now</BuyNow>
            </Group11>
         </FlexWrapperThree>
      </Card>
   );
};

export default CardComponent;