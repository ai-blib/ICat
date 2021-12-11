import {memo} from "react";
import {Button} from './styles'
import Icon from "@/icons/Icon";

interface Props {
    onClick?: Function,
    children: JSX.Element | string,
    logo: string,
    disabled?:boolean
};

export const SelectButton = memo(({onClick, children, logo,disabled}: Props) => {
    return (
        <Button onClick={() => !disabled&&onClick && onClick()}>
            {logo ? <img src={logo} alt=""/> : <span className='place' />}
            <span className="text">{children}</span>
            {disabled?<span />:<Icon name='downTriangle'/>}
        </Button>
    )
})
