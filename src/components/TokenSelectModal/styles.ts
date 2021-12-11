import styled from "styled-components";

export const RenderWrap = styled.div`
       width:100%;
       height: 40px;
       display: flex;
       flex-direction: row;
       align-items: center;
       justify-content: space-between;
       
        &:hover{
          .ho{
             color: #888E8F!important;
          }
       }
       .iconWrap{
       display: flex;
       flex-direction: row;
       align-items: center;
       justify-content: center;
      
       }
      
`;
export const Image = styled.img`
           width: 40px;
           height: 40px;
           border-radius: 50%;
           border: 0;
           background: #151515;
`;
export const Title = styled.span`
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            line-height: 25px;
            color: #F6FCFD;
            padding-left:12px;
            padding-right: 6px;

`;
export const Des=styled.span`
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 22px;
            color: #888E8F;

`;
export const Number = styled.span`
       font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 25px;
        text-align: right;
        color: #F6FCFD;
       
`;
export const Wrap = styled.div` 
         width: 100%;
         height: auto;
        display: flex;
        flex-direction: column;
        overflow: hidden;
`

