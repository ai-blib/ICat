import {InputWrap} from './styles'

export const Input =({onChange,placeholder}:{onChange:Function,placeholder:string})=>{
     return(
         <InputWrap placeholder={placeholder} onChange={(e)=>onChange&&onChange(e)} />
     )
}
