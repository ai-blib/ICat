import {SwitchContainer,Input,Circle,On,Yes,Label} from './styles';
import {memo} from "react";
import './index.css'
interface Props {
     onChange?:Function,
     checked?:boolean,
     leftText:string,
     rightText:string
}
export const Switch =memo(({onChange,checked,leftText,rightText}:Props) => {
    return (
        <SwitchContainer className='switchContainer'>
            <Input onChange={()=>onChange&&onChange()} />
            <Label>
                 <Circle className={`circle ${checked?"right":"left"}`} />
                 <On>{leftText}</On>
                 <Yes>{rightText}</Yes>
            </Label>
        </SwitchContainer>
    )
})
