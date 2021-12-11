import {Wrap} from './styles';
import Icon, {Name} from "@/icons/Icon";

interface Props {
    icon: Name,
    className?: string,
    selected?:boolean,
    onClick?:Function
}

export const GuideIcon = ({onClick,selected,icon, className}: Props) => {
    return <Wrap onClick={()=>onClick&&onClick()} selected={selected} className={className}>
        <Icon name={icon}/>
    </Wrap>
}
