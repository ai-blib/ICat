import styled from "styled-components";

export const Sheader = styled.header`
        width: 100%;
        height: 112px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 60px;

`;
export const Wrap = styled.div`
       display: flex;
       flex-direction: row;
`
export const Connect = styled.img`
        width: 182px;
        height: 50px;
        border: 0;
        cursor: pointer;
`;
export const Layout = styled.div`
        width: 225px;
        height: 122px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        background: #1E1E1E;
         filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.35));
         font-family: Nunito Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 22px;
            /* identical to box height */
            color: #F6FCFD;
            cursor: pointer;
            padding: 17px 19px;

            ul{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
               
                li{
                  width: 100%;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  margin-bottom: 14px;
                  font-family: Nunito Sans;
                
                    font-style: normal;
                    font-weight: bold;
                    font-size: 16px;
                    line-height: 22px;
                    /* identical to box height */
                    color: #F6FCFD;
                  .icon{
                     margin-right: 17px;
                  }
                  &:last-child{
                  margin-bottom: 0;
                  }
                }
            }
`



