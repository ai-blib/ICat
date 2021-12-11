import styled from "styled-components";

export const Wrap=styled.div<{selected:boolean|undefined}>`
    width: 42px;
    height: 42px;
    background:${({selected})=>selected?"#3D52F4":"#1E1E1E"} ;
    border: 1px solid ${({selected})=>selected?"#3D52F4":"#373737"} ;
    box-sizing: border-box;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`
