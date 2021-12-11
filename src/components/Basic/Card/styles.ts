import styled from "styled-components";

export const CardWrap = styled.div<{ height?: number,borderColor?:string}>`
            background: #1E1E1E;
            border: 1px solid ${({borderColor})=>borderColor||"#373737"};
            box-sizing: border-box;
            border-radius: 20px;
             width: 480px;
             height: ${({height}) => (height ?height:115) + 'px'};
             padding:18px 20px;
`;
