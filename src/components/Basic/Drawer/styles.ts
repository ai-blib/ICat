import styled from 'styled-components';
export namespace DrawerStyles {
    export const Container = styled('div')`
                    width: 416px;
                    height: 100%;
                    background-color: #FFFFFF;
                    filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.25));
                    padding: 19px 17px;
       `
    export const InfoWrap = styled('div')`
                    width: 100%;
                    height: 68px;
                    background: #EFEFEF;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    padding: 8px 16px;
                    box-sizing: border-box;
                    justify-content: space-between;
                    align-items: center;
`
  export const InfoItem = styled('div')`
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  flex-direction: row;   
`
    export const InfoSpan = styled('span')<{color?:string,fontSize?:number|string}>`
                  color: ${({color})=>(color||'#696969')};
                  font-size: ${({fontSize})=>(fontSize||16)}px;
`
   export const Cursor = styled('span')`
                  cursor: pointer;
                  display: contents;
`
  export  const BalanceWrap = styled('div')`
                  width: 100%;
                  height: 158px;
                  border: 1px solid ${({theme})=>(theme.borderColor)};
                    box-sizing: border-box;
                    border-radius: 12px;
                    padding: 15px 17px;
                    padding-top: 13px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;

`
    export const Title = styled('span')`
                   font-family: Inter;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 160%;
                    /* identical to box height, or 26px */
                    
                    display: flex;
                    align-items: center;
                    
                    color: #696969;
`
    export const Funs = styled('span')`
                  font-family: Inter;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 24px;
                    line-height: 160%;
                    /* or 38px */ 
                    display: flex;
                    align-items: center;
                    text-align: center;
                    color: #000000;

`
}