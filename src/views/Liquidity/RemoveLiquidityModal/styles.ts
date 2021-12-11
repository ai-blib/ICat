import styled from "styled-components";


export const Wrap = styled.div` 
         width: 100%;
         height: 100%;
         display: flex;
         flex-direction: column;
         border-top: 1px solid #2F2F2F;        
         align-items: center;
         .listWrap{
           width: 100%;
           display: flex;
           align-items: center;
           justify-content: space-around;
           flex-direction: row;
           margin-top: 35px;
          
           li{
             width: 98.88px;
             height: 40px;
             display: flex;
             align-items: center;
             justify-content: center;
             border: 1px solid #3B50ED;
            box-sizing: border-box;
            border-radius: 12px;
           font-family: Nunito Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 22px;
            /* identical to box height */
            text-align: center;
            opacity: 0.4;
            color: #FFFFFF; 
            cursor: pointer;
            &:hover{
             opacity:1;
            }
            &:active{
            opacity: 1;
            }
           }
           .active{
             opacity: 1;
           }
         }
`

export const Title = styled.div`
        width: 100%;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        /* identical to box height */
        text-align: center;
        color: #888E8F;
        padding-top: 21px;
`;
export const Number = styled.div`
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 38px;
        line-height: 52px;
        text-align: center;
        color: #F6FCFD;
`;
export const SliderWrap=styled.div`
        width: 360px;
`;

export const GuideWrap = styled.div`
       width: 100%;
       height: 1px;
       display: flex;
       align-items: center;
       justify-content: center;
       background: #2F2F2F;;
       position: relative;
       margin-top: 43px;
       .guid{
          position: absolute;
          top:50%;
          left: 50%;
          margin-top: -21px;
          margin-left: -21px;
       }
`;
export const List = styled.div`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
       .numberColumn{
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           .number{
             font-family: Nunito Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 20px;
            line-height: 27px;
            text-align: right;
            color: #F6FCFD;
           }
           .subNumber{
             font-family: Nunito Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 19px;
            /* identical to box height */
            
            text-align: right;
            
            color: #F6FCFD;
           }
       }
`;