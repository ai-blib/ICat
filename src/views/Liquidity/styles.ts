import styled from "styled-components";

export const PositionWrap = styled.div `
            width: 100%;
            padding-top: 30px;
            padding-bottom: 16px;
            border-bottom: solid 1px #373737;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span{
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            line-height: 25px;
            /* identical to box height */
            color: #F6FCFD;
            
            }
            button{
              background: linear-gradient(180deg, #3D52F4 0%, #192985 100%);
              border-radius: 12px;
              width: 141px;
              height: 40px;
              border: 0;
              outline: 0;
              display: flex;
              align-items: center;
            }
     
`;
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
export const ListDisplay = styled.div<{visible:boolean}>`
           display: ${({visible})=>visible?'flex':'none'};
           flex-direction: column;
     
`
