import {memo} from "react";
import {InnerInput, InputWrap} from './styles'
import Icon from "@/icons/Icon";
import {Gap} from '../';
interface Props {
    placeholder?:string
}
export const SearchInput = memo(({placeholder}:Props) => {
    return (
        <InputWrap>
            <Gap width={16}/>
            <Icon name='search'/>
            <InnerInput placeholder={placeholder||""} />
        </InputWrap>)
})
