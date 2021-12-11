import styled from "styled-components";

export const SwitchContainer = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
       
`

export const On = styled.span`
    position: relative;
    z-index: 10;
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #F6FCFD;
    cursor: pointer;
    color: #F6FCFD;
    margin-top: 2px;
    margin-left:18px ;
`;
export const Yes = styled(On)`
    color: #F6FCFD;
    margin-top: 2px;
    margin-right: 18px;
`
export const Circle = styled.span`
    width: 63.11px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
     left: 5.8px;
    transition: all 0.3s;
    background: linear-gradient(108.08deg, #3D52F4 0%, #192985 100%);
    border-radius: 100px;
`;
export const Label = styled.label.attrs({
    htmlFor: 'radio'
})`
    position: relative;
    width: 135px;
    height: 40px;
    background: #1E1E1E;
    border-radius: 100px;
    line-height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5.8px;
    box-sizing: border-box;
    
        
`;
export const Input = styled.input.attrs({
    type: "checkbox",
    name: "switch",
    id: "radio"
})` 
  display: none;
 
`;
