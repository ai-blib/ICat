import {ImageA, ImageB, Wrap} from './styles';

interface Props {
    top: string,
    bottom: string,
    height?: number,
    width?: number,
    iconWidth?:number
}

export const DoubleIcon = ({top, bottom, height, width}: Props) => {
    return (<Wrap width={width} height={height}>

        {top && <ImageA  src={top}/>}
        {bottom && <ImageB  src={bottom}/>}
    </Wrap>)
}
