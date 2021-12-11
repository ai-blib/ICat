import styled from "styled-components";

export const Wrap = styled.div<{radius?:number,width?:number,height?:number}>`
              border-radius: ${({radius})=>radius}px;
              width: ${({width})=>width?width+"px":"100%"};
              height: ${({height})=>height?height+"px":"100%"};
              border: 0;
              outline: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: Nunito Sans;
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 22px;
                /* identical to box height */
                text-align: center;
                color: #FFFFFF;
                cursor: pointer;

`;

export const ButtonWrap = styled.button<{radius?:number,width?:number,height?:number}>`
            background: linear-gradient(180deg, #3D52F4 0%, #192985 100%);
              border-radius: ${({radius})=>radius}px;
              width: ${({width})=>width?width+"px":"100%"};
              height: ${({height})=>height?height+"px":"100%"};
              border: 0;
              outline: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: Nunito Sans;
              cursor: pointer;
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 22px;
                /* identical to box height */
                
                text-align: center;
                
                color: #FFFFFF;

`;
