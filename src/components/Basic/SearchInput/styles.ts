import styled from "styled-components";

export const InputWrap = styled.div`
     width: 100%;
     height: 42px;
     background: #282828;
     border-radius: 20px;
     display: flex;
     align-items: center;
     justify-content: center;
     flex-direction: row;
     border: 1px solid transparent;
      &:hover{
        border: 1px solid #3D52F4;
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
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
/* identical to box height */


color: #888E8F;
    } 
    &:-moz-placeholder { 
    /* Mozilla Firefox 4 to 18 */ 
        font-family: Nunito Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    } 
    &::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    } 
    &:-ms-input-placeholder { 
    /* Internet Explorer 10+ */ 
        font-family: Nunito Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px; 
  }
`

