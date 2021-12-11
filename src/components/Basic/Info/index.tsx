import {CellWrap, InfoWrap} from "./styles";
import Icon, {Name} from "@/icons/Icon";
interface Props {
    from: string,
    to: string,
    icon?: Name,
    exChangeAmount?:string|number,
    warnIcon?:JSX.Element
}

export const Info = ({from, to, icon,exChangeAmount,warnIcon}: Props) => {
    return (
        <InfoWrap>
            <CellWrap>
                <span className='from'>
                    {from}
                </span>
                <Icon name={icon || 'rightArrow'}/>
                <span className='to'>
                    {to}
                </span>
            </CellWrap>
            <CellWrap>
                <span>
               1
                </span>
                <span>
                {from}
                </span>
                <span>
                    =
                </span>
                <span>
                    {exChangeAmount}
                </span>
                <span>
                    {to}
                </span>
                <span className='icon'>
                        {warnIcon||<Icon name='warn'/> }
                </span>
            </CellWrap>
        </InfoWrap>
    )
}
