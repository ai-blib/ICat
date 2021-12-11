import styled from "styled-components";

export const Navbar = styled.ul`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        width: 410px;
        height: 50px;
        left: 515px;
        top: 32px;
        background: #1E1E1E;
        border-radius: 100px;
         margin-top: -82px;
       
          
`
export const Nav = styled.li<{active?:boolean}>`
           font-family: Nunito Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 22px;            
            text-align: center;
            color: #F6FCFD;
            background: ${({active,theme}) => (active ? theme.buttonColor : "transparent")};
            width: 100px;
            height: 40px;
            border-radius:${({active}) => (active ? "100px" : null)} ;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;


`
