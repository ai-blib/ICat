import styled from "styled-components";

export const Header = styled.div`
         width: 100%;
         padding: 24px 0;
         border-bottom: 1px solid #373737;
         font-family: Nunito Sans;
         font-style: normal;
         font-weight: bold;
         font-size: 18px;
         line-height: 25px;
         color: #F6FCFD;
`;
export const AEmpty= styled.div`
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        /* identical to box height */
        text-align: center;
        color: #888E8F;
        margin-top: 35px;
`;
export const List =styled.div`
       width: 100%;
       display: flex;
       flex-direction: column;
       margin-top: 20px;

`;
export const Date =styled.div`
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        /* identical to box height */
        color: #888E8F;
        margin-bottom: 15px;

`;
export const ListItem = styled.div`
       width: 100%;
       height: 80px;
       background: #1E1E1E;
       border-radius: 20px;
       display: flex;
       flex-direction: row;
       align-items: center;
       justify-content: space-between;
       padding: 16px;
       
       .column{
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          .title{
             font-family: Nunito Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            line-height: 25px;
            color: #F6FCFD;

          }
          .subTitle{
          font-family: Nunito Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 22px;
            /* identical to box height */
            
            
            color: #888E8F;
          }
       }
       .margin{
         margin-left: 16px;
       }
       .right{
        text-align: right;
       }
      
`;
export const Row = styled.div`
      display: flex;
`

