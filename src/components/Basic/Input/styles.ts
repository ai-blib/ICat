import styled from "styled-components";

export const InputWrap = styled.input`
      border: 0;
      height: 29px;
    position: relative;
    outline: none;
    border: none;
    flex: 1 1 auto;
    background-color: transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px;
    text-align: right;
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 41px;
    /* identical to box height */
    text-align: right;
    color: #F6FCFD;
      &::-webkit-input-placeholder {
      font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 41px;
        /* identical to box height */
        
        
        color: #888E8F;
    }
     &:-moz-placeholder {
      font-family: Nunito Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 41px;

    color: #888E8F;
    }
     &::-moz-placeholder{
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 41px;
    color: #888E8F;
    }
     &:-ms-input-placeholder {
      font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 41px;
        color: #888E8F;
    }
      
`
