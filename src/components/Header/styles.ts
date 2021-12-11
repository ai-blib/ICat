import {styled} from '@mui/system';

export namespace HeaderStyles {

    export const Header = styled('header')`
        width: 100%;
        height: 88px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 64px;

`;
    export const SearchWrap = styled('div')`
       width:322px ;
`
    export const RowWrap = styled('ul')`
         display: flex;
         align-items: center;
         flex-direction: row;
        
`;
    export const RowListItem = styled('li')`
        font-family: Inter;
        font-style: normal;
        font-weight: 900;
        font-size: 16px;
        line-height: 160%;
        /* identical to box height, or 26px */
        display: flex;
        align-items: center;
        text-align: center;
        /* 2 */
        color: #696969;
        /* Inside Auto Layout */
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 0px 32px;
        &:hover{
        color:  #FF0000;
        cursor: pointer;
        }
`
}


