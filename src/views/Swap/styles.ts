import styled from "styled-components";


export const SwapHeader = styled.header`
        width: 100%;
        height: 108px;
        display: flex;
        align-items: center;
        flex-direction: column;
        background: #1E1E1E;
        border-radius: 20px;
`;
export const SwapTop = styled.header`
        width: 100%;
        height: 53px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 21px;
        .swapTitle{
           font-family: Nunito Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            line-height: 25px;
            /* identical to box height */
            
            text-align: center;
            
            color: #F6FCFD;
        }
`
export const SwapLazy = styled.div`
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background: ${({theme}) => (theme.grayBackground)};
        padding: 0 21px;
        border-radius:0 0 20px 20px;
        .lazyText{
          font-family: Nunito Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 22px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          color: #F6FCFD;
           span {
             margin-right: 6px;
           }
        }
`;

