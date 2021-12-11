import styled from "styled-components";

export const RenderWrap = styled.div`
       width:100%;
       height: 80px;
       display: flex;
       flex-direction: row;
       align-items: center;
       justify-content: space-between;
        margin-bottom: 20px;
        background: #1E1E1E;
        border-radius: 20px;
        padding: 14px 20px;
        position: relative;
        .row{
        display: flex;
         .reduce,.add{
         cursor: pointer;
          width: 40px;
          height: 40px;
          border: 1px solid #888E8F;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        } 
        .add{
           border: 1px solid #3B50ED;
           margin-left: 10px;
        }
        }
       
        
        .iconFirst{
              width: 44px;
              height: 44px;
            
        }
       .iconWrap{
           display: flex;
           flex-direction: row;
           align-items: center;
           justify-content: center;
           margin-left: 17.6px;
          
       }
       .columnInfo{
         display: flex;
         align-items: center;
         justify-content: center;
         flex-direction: column;
          .title{
             font-family: Nunito Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 22px;
            color: #888E8F;
          }
          .number{
                margin-top: 4px;
                font-family: Nunito Sans;
                font-style: normal;
                font-weight: bold;
                font-size: 18px;
                line-height: 25px;
                color: #F6FCFD;
          }
          .green{
              color: #46D7AB;
          }
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
export const Des = styled.span`
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
         height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        margin-top: 20px;
`;
export const Row = styled.div`
         display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
`

export const Empty = styled.div`
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
