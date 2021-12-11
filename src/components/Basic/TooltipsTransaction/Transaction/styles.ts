import styled from "styled-components";

export const Wrap = styled.div`
      width: 310px;
      height: 148px;
      background: #1E1E1E;
      border-radius: 20px;
      padding: 13px 18px;
      filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.35));
      .row{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
        .btn{
         border: 0;
         width: 68px;
         height: 40px;
        background: linear-gradient(108.08deg, #3D52F4 0%, #192985 100%);
        border-radius: 100px;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        /* identical to box height */
        
        text-align: center;
        cursor: pointer;
        color: #F6FCFD;
        &:hover{
          opacity:0.8;
        }
        }
      }
      .inputW{
        display: flex;
        flex-direction: row;
        position: relative;
        align-items: center;
        justify-content: center;
        .per{
        position: absolute;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        /* identical to box height */
        
        text-align: center;
        
        color: #F6FCFD;
        right: 15px;
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
export const Title = styled.div`
      font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        color: #F6FCFD;
        margin: 12px 0;
`;
export const InputWrap = styled.input`
      height: 29px;
      width: 195px;
    position: relative;
    outline: none;
    background: #1E1E1E;
   border: 1px solid #373737;
   box-sizing: border-box;
   border-radius: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 31px;
    text-align: right;
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */
       
    color: #888E8F;
    &:disabled{
      font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 41px;
        color:#888E8F;

    }
    /* identical to box height */
      &::-webkit-input-placeholder {
       font-family: Nunito Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
        color: #888E8F;
    }
     &:-moz-placeholder {
       font-family: Nunito Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;

    color: #888E8F;
    }
     &::-moz-placeholder{
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #888E8F;
    }
     &:-ms-input-placeholder {
       font-family: Nunito Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
        color: #888E8F;
    }
      
`

