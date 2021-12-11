import styled from "styled-components";

export const Inner = styled.div`
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        .cardColumn{
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
           align-items: center;
          .text{
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 22px;
            color: #888E8F;
            display: flex;
            align-items: center;
            flex-direction: row;
            .textBalance{
              margin-left: 7px;
              margin-top: 2px;
            }
          }
          
        }
        .guide{
          position: absolute;
          left: 50%;
          margin-left: -24px;
          bottom: -45px;
        }
`;
export const Quota = styled.div`
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 41px;
        color: #888E8F;
`;
export const Small = styled.div`
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        text-align: right;
        color: #888E8F;
`
export const InputWrap = styled.input<{inputFontColor?:string}>`
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
    &:disabled{
      font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 41px;
        color:${({inputFontColor})=>inputFontColor||"#888E8F"} ;

    }
    /* identical to box height */
      color:${({inputFontColor})=>inputFontColor||"#F6FCFD"} ;
      &::-webkit-input-placeholder {
      font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 41px;
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
