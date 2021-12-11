import {CardWrap} from './styles'
interface Props{
    children:JSX.Element,
    borderColor?:string
}
export const Card = ({children,borderColor}:Props) => {
    return (
        <CardWrap borderColor={borderColor}>
            {children}
        </CardWrap>)
};

