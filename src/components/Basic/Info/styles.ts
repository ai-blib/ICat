import styled from "styled-components";

export const InfoWrap = styled.div`
       width: 100%;
       display: flex;
       flex-direction: row;
       align-items: center;
       justify-content: space-between;
      font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        /* identical to box height */
        color: ${({theme}) => (theme.spanColor)};
`;
export const CellWrap = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        span{
          padding-left: 6px;
        }
        .from,.icon{
         padding: 0 6px;
        }
        
`;
