import {ButtonWrap, Wrap} from './styles'
import ListItemButton from '@mui/material/ListItemButton';

interface Props {
    radius?: number,
    width?: number,
    height?: number,
    onClick?: () => void,
    children: JSX.Element | string
}

export const SmallButton = ({radius, width, onClick, height, children}: Props) => {
    return (
        <Wrap onClick={() => onClick && onClick()} radius={radius} width={width} height={height}>
            <ListItemButton  >
                <ButtonWrap radius={radius} width={width} height={height}>
                    {children}
                </ButtonWrap>
            </ListItemButton>
        </Wrap>
    )
}
