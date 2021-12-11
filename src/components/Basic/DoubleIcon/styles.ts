import styled from "styled-components";

export const Wrap = styled.div<{height?:number,width?:number}>`
              height: ${({height})=>height||43}px;
              position: relative;
              width:${({width})=>width||55}px;
`;
export const ImageA = styled.img`
           width: 28.5px;
           height: 28.5px;
           border-radius: 50%;
           border: 0;
           background: #151515;
           position: absolute;
           
`;
export const ImageB = styled.img`
           width: 28.5px;
           height: 28.5px;
           border-radius: 50%;
           border: 0;
           background: #151515;
           position: absolute;
           top: 14px;
           left: 14px;  
`;

