import {Content, TipWrap, Title} from './styles'
import Icon from '@/icons/Icon'

interface Props {
    title: string,
    content: JSX.Element | string,
    onClick?:()=>void
}

export const Tips = ({title, content,onClick}:Props) => {
    return (
        <TipWrap>
            <Title>{title}<span onClick={()=>onClick&&onClick()}>
                {/*<Icon name='close'/>*/}
            </span></Title>
            <Content>
                {content}
            </Content>
        </TipWrap>
    )
}
