import {memo, useEffect, useMemo, useState} from "react";
import {Card, GuideIcon, SelectButton} from '../';
import {Inner, Small,InputWrap} from './styles';
import Icon, {Name} from "@/icons/Icon";
import {TokenValue} from '@/types/global'
import {getCurrencyString} from "@/utils/formate";
import {LiquidityApi} from "@/apis";
import {TextLoading} from '@/components'

interface Props {
    guide?: Name|undefined,
    $handleSelect?: (e) => void,
    balanceIcon?: Name,
    tokenValue: TokenValue,
    $onInputChange?: Function,
    balance?:number|bigint|null,
    type?:any,
    inputDisabled?:boolean,
    inputValue?:string|number,
    selected?:boolean,
    borderColor?:string,
    $guideClick?:Function,
    subText?:string|Boolean,
    inputFontColor?:string
};
export const SwapCard = memo(({inputFontColor,subText,$guideClick,borderColor,selected,inputValue,inputDisabled,type,balance,$onInputChange, tokenValue, guide, $handleSelect, balanceIcon}: Props) => {
    const {symbol,logo,decimals,id} = tokenValue;
    if (inputDisabled===undefined) inputDisabled = false;
    const [tokenLogo, setTokenLogo] = useState<string>('');
    useEffect(():any => {
        let isUnmount = false;      //isUnmount
        if (id) {
            LiquidityApi.getTokenInfo(id).then((res) => {
                if (!isUnmount){
                    setTokenLogo(res.logo);
                    // logo = res.logo;
                }

            })
            return ()=>isUnmount = true;
        }
        return ()=>isUnmount = true;
    }, [id,logo]);
    const balanceText = useMemo(()=>{
           if (!symbol){
               return '';
           }else if (balance===null){
               return  <TextLoading loading={true} />;
           }else if (!balance){
               return  "0.00";
           }else if (balance){
               return getCurrencyString(Number(balance),Number(decimals),4);
           }
    },[symbol,balance,decimals])
    return (
        <Card borderColor={borderColor}>
            <Inner>
                <div className='cardColumn'>
                    <SelectButton
                        disabled={inputDisabled}
                        logo={logo||tokenLogo}
                        onClick={() => $handleSelect && $handleSelect(type)}>
                        {symbol}
                    </SelectButton>
                    <InputWrap disabled={inputDisabled}
                               value={inputValue}
                               inputFontColor={inputFontColor}
                               placeholder='0.00'
                               onChange={(e)=>$onInputChange && $onInputChange(e.target.value)}/>
                </div>
                <div className='cardColumn'>
                    <p className='text'>
                        {subText||(<><Icon name={balanceIcon || 'currency'}/>
                            <span className='textBalance'>Balance: {balanceText} {symbol}</span></>)}

                    </p>
                    <Small>
                        $0.00
                    </Small>
                </div>
                {guide && <GuideIcon onClick={$guideClick}  selected={selected} className='guide' icon={guide}/>}
            </Inner>
        </Card>
    )
});
