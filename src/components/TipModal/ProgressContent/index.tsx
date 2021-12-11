import {Iconb, IconWrap, ProgressWrap, SubTitle, Text, Title, ToWrap} from './stylescontet';
import {Column} from '@/styles'
import Icon from "@/icons/Icon";
import {memo, useMemo} from "react";

const IconColor = {
    default: '#F6FCFD',
    disabled: '#888E8F'
}
export type status = "deposit" | "swapping" | "widthDrawing";
interface Props {
    status: status,

}
export default memo(({status}: Props) => {
    const depositDisabled = useMemo(() => {
        return (!["deposit", "swapping", "widthDrawing"].includes(status))
    }, [status]);
    const swappingDisabled = useMemo(() => {
        return (!["swapping", "widthDrawing"].includes(status))
    }, [status]);
    const widthDrawingDisabled = useMemo(() => {
        return (!["widthDrawing"].includes(status))
    }, [status]);
    return (
        <>
            <Title>Swap in progress</Title>
            <SubTitle>Please allow a few seconds for swap to finish</SubTitle>
            <ProgressWrap>
                <Column>
                    <IconWrap disabled={depositDisabled}>
                        <Iconb disabled={depositDisabled}/>
                        <Icon color={depositDisabled ? IconColor.disabled : IconColor.default} name='deposit'/>
                    </IconWrap>
                    <Text disabled={depositDisabled} className='text'>
                        Depositing
                    </Text>
                    <Text disabled={depositDisabled} className='text'>
                        ICP
                    </Text>
                </Column>
                <Column>
                    <ToWrap>
                        <Icon color={depositDisabled ? IconColor.disabled : IconColor.default} name='>>'/>
                    </ToWrap>
                </Column>
                <Column>
                    <IconWrap disabled={swappingDisabled}>
                        <Iconb disabled={swappingDisabled}/>
                        <Icon color={swappingDisabled ? IconColor.disabled : IconColor.default} name='swapping'/>
                    </IconWrap>
                    <Text disabled={widthDrawingDisabled} className='text'>
                        Swapping
                    </Text>
                    <Text disabled={widthDrawingDisabled} className='text'>
                        ICP to XTC
                    </Text>
                </Column>
                <Column>
                    <ToWrap>
                        <Icon color={depositDisabled ? IconColor.disabled : IconColor.default} name='>>'/>
                    </ToWrap>
                </Column>
                <Column>
                    <IconWrap disabled={widthDrawingDisabled}>
                        <Iconb disabled={widthDrawingDisabled}/>
                        <Icon color={widthDrawingDisabled ? IconColor.disabled : IconColor.default} name='widthDrawing'/>
                    </IconWrap>
                    <Text disabled={widthDrawingDisabled} className='text'>
                        widthDrawing
                    </Text>
                    <Text disabled={widthDrawingDisabled} className='text'>
                        ICP
                    </Text>
                </Column>
            </ProgressWrap>
        </>
    )
})
