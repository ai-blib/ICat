import { AvatarWrap } from './styles'
import Icon from '../../../icons/Icon'
interface Props {
    onClick?: () => void,
}
export const Avatar = ({ onClick }: Props) => {
    return (
        <AvatarWrap onClick={onClick && onClick}>
            {/*<Icon name='avatar' />*/}


            {/* <Icon name='down' /> */}
        </AvatarWrap>
    )
}
