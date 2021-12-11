import {AvatarWrap} from './styles'
import Icon from '../../../icons/Icon'
interface Props {
    onClick?:()=>void,
    text:string
}
export const Avatar = ({onClick,text}:Props) => {
    return (
        <AvatarWrap onClick={onClick&&onClick}>
            <Icon name='avatar' />
            <span className='avatarText'>
                {text}
            </span>

            <Icon name='down' />
        </AvatarWrap>
    )
}
