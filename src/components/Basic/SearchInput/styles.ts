import styled from "styled-components";

export const InputWrap = styled.div`
     width: 100%;
     height: 42px;
     background: rgba(204, 204, 204, 0.6);
     /* blur */
     backdrop-filter: blur(40px);
     /* Note: backdrop-filter has minimal browser support */
     border-radius: 20px;
     display: flex;
     align-items: center;
     justify-content: center;
     flex-direction: row;
     border: 1px solid transparent;
      &:hover{
        border: 1px solid #FF0000;
     }
`
export const InnerInput = styled.input`
     background: transparent;
     outline: none;
     width: 100%;
     height: 100%;
     border: 0;
     flex: 1;
     text-indent: 5px;
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;    
    color: #F6FCFD;
    caret-color:#FFFFFF;
    &::-webkit-input-placeholder { 
    /* WebKit browsers */ 
       font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 160%;
    /* or 19px */
    color: rgba(105, 105, 105, 0.6);
/* identical to box height */

    color: rgba(105, 105, 105, 0.6);

    } 
    &:-moz-placeholder { 
    /* Mozilla Firefox 4 to 18 */ 
       font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 160%;
    /* or 19px */
    color: rgba(105, 105, 105, 0.6);
    } 
    &::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
     font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 160%;
    /* or 19px */
    color: rgba(105, 105, 105, 0.6);
    } 
    &:-ms-input-placeholder { 
    /* Internet Explorer 10+ */ 
        font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 160%;
    /* or 19px */
    color: rgba(105, 105, 105, 0.6);
  }
`

