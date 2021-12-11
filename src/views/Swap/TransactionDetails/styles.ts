import styled from "styled-components";

export const Wrap = styled.div`
     display: flex;
     align-items: center;
     flex-direction: column;
     width: 310px;
     height: auto;
     background: #1E1E1E;
     padding: 13px 18px;
     border-radius: 20px;
     filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.35));
     ul{
         width: 100%;
         height: 100%;
         display: flex;
         align-items: center;
         justify-content: center;
         flex-direction: column;
         padding-bottom: 14px;
         li{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          font-family: Nunito Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 19px;
            color: #F6FCFD;
         }
     }
`;
export const Header = styled.div`
      width: 100%;
      padding-bottom: 9px;
      border-bottom: 1px solid #373737;
      font-family: Nunito Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        /* identical to box height */
        color: #F6FCFD;
`;
