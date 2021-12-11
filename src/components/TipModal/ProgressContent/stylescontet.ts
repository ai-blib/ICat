import styled from "styled-components";

export const Title=styled.h1`
              width: 100%;
              font-family: Nunito Sans;
                font-style: normal;
                font-weight: bold;
                font-size: 22px;
                line-height: 30px;
                /* identical to box height */
                text-align: center;
                color: #F6FCFD;
            
`;
export const SubTitle =styled.h1`
                font-family: Nunito Sans;
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: 22px;
                /* identical to box height */
                text-align: center;
                color: #888E8F;
                margin-top: 13px;
`;
export const Image = styled.img`
              width: 59px;
              height: 100px;
              margin-top: 31px;
`;
export const ProgressWrap = styled.div `
              width: 100%;
              height: auto;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              padding: 0 36px;
              margin-top: 33px;
            
`;
export const IconWrap = styled.div<{disabled:boolean}>`
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background:${({disabled})=>disabled?"#353535":"#3D52F4"} ;
        position: relative;
        margin-bottom: 9px;
        svg{
          position: relative;
          z-index: 3;
        }

`;
export const Iconb = styled.div<{disabled:boolean}>`
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: ${({disabled})=>disabled?"#353535":"#3D52F4"};
         display: flex;
        align-items: center;
        justify-content: center;
        filter: blur( ${({disabled})=>disabled?0:"10px"});
`;
export const ToWrap = styled.div`
               padding-bottom: 40px;
`;
export const Text = styled.span<{disabled:boolean}>`
                font-family: Nunito Sans;
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 19px;
                text-align: center;
                color:${({disabled})=>disabled?"#888E8F":"#FFFF"};
`
