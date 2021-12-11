import styled from "styled-components";

export const Button = styled.div`
         width: max-content;
         background: #282828;
         border-radius: 20px;
         display: flex;
         align-items: center;
         justify-content: space-between;
         flex-direction: row;
         padding: 9px 12px 8px 10px;
         box-sizing: border-box;
         cursor: pointer;
         img,.place{
         display: flex;
         width: 20px;
         height: 20px;
         border-radius: 50%;
         }
        
         &:hover{
           opacity: 0.8;
         }
         .text{
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            line-height: 25px;
            color: #F6FCFD;
            margin: 0 7px 0 10px;
         }
;

`
