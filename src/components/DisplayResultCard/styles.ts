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
           .amount{
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 30px;
            line-height: 41px;
            /* identical to box height */
            
            text-align: right;
            
            color: #FFFFFF;
           }
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
      
`;
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
`
export const Wrap = styled.div<{height?:number,width?:number}>`
              height: ${({height})=>height||24}px;
              position: relative;
              width:${({width})=>width||18}px;
`;
export const ImageA = styled.img`
           width: 14.5px;
           height: 14.5px;
           border-radius: 50%;
           border: 0;
           background: #151515;
           position: absolute;
           
`;
export const ImageB = styled.img`
           width: 14.5px;
           height: 14.5px;
           border-radius: 50%;
           border: 0;
           background: #151515;
           position: absolute;
           top: 7px;
           left: 7px;  
`;
