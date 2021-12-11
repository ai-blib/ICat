import React, {memo, useCallback, useEffect, useState} from "react";
import {Modal, SearchInput, GuideIcon, SelectButton,Gap,Sbutton} from '@/components';
import classnames from 'classnames'
import { Wrap,Title,Number,SliderWrap,GuideWrap,List} from './styles';
import './index.less'
import Box from '@mui/material/Box';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {TokenValue} from '@/types/global'
import {AssetsApi, LiquidityApi} from '@/apis';
import {getCurrencyString,initDefaultLiquidityToken} from '@/utils/formate'
import BigNumber from "bignumber.js";
import {useMessage} from "@/usehooks/useNotification";

interface Props {
    title: string,
    visible: boolean,
    token:any,
    onClose: () => void,
};
export default memo(({title, visible, onClose,token}: Props) => {
    const {Message}:{ Message: Function } = useMessage();
    const transaction = 0.03;
    const {lpTokens,totalSupply,reserve0,reserve1} = token;
    let tokensInfo = (initDefaultLiquidityToken(token));
    const defaultFromToken =((tokensInfo.defaultFromToken) as TokenValue);
    const defaultToToken =((tokensInfo.defaultToToken) as TokenValue);
    //--------state--------
    const [amount,setAmount]= useState<number>(0);
    const [fromBalance,setFromBalance] = useState<number|string>(0);
    const [toBalance,setToBalance] = useState<number|string>(0);


     ///-------methods------------
    const balanceOf=(fromTokenId,toTokenId)=>{
        if (fromTokenId){
            AssetsApi.balanceOf(fromTokenId).then((tokenBalance)=>{
                setFromBalance(String(tokenBalance))
            });
        }
        if (toTokenId){
            AssetsApi.balanceOf(toTokenId).then((tokenBalance)=>{
                setToBalance(String(tokenBalance))
            });
        }
    }
    const handleRemoveLiquidity =useCallback( async () => {
        // amount0min 等于 lpamount/lp totalsupply * reserve0 * （1-slippage）
           const lpAmount = new BigNumber(lpTokens).times(amount/100);
           const amount0Min = lpAmount.div(new BigNumber(totalSupply).times(reserve0).times(1-transaction))
           const amount1Min = lpAmount.div(new BigNumber(totalSupply).times(reserve1).times(1-transaction))

        const result = await LiquidityApi.removeLiquidity(
            defaultFromToken.id.toString(),
            defaultToToken.id.toString(),
            String(lpAmount),
            String(amount0Min),
            String(amount1Min),
            String(defaultFromToken.decimals),
            String(defaultToToken.decimals));
        if (result.err){
            const title =`remove fail`;
            Message({type: "error", title, content: result.err});
        }else {
            Message({type: "error", title:'remove success', content: ''});
        }
        return
    },[amount]);

    //watch state
    useEffect(() => {
        if (defaultFromToken&&defaultFromToken){
            balanceOf(defaultFromToken.id,defaultToToken.id)
        }
    }, [defaultFromToken,defaultFromToken]);

    return (
        <Modal header={title}
               onClose={() => onClose && onClose()}
               visible={visible}
               className='removeLiquidityModal'
        >
            <Wrap>
                <Title>Amount</Title>
                <Number>{amount}%</Number>
                <SliderWrap>
                    <Slider value={amount} className='slider-liquidity' min={0} max={100} onChange={(e)=>setAmount(e)} />
                </SliderWrap>
                <ul className='listWrap'>
                    {
                        ['25','50','75','100'].map((_item)=>{
                            return(<li key={_item} className={classnames({'active':_item===String(amount)})}
                                       onClick={()=>setAmount(+_item)} >
                                {_item}%
                            </li>)
                        })
                    }
                </ul>
                <GuideWrap>
                    <GuideIcon icon='downArrow' className='guid' />
                </GuideWrap>
                 <Gap height={34} />
                <List>
                    <SelectButton
                        logo={defaultFromToken.logo||""}
                    >
                        {defaultFromToken.symbol||""}
                    </SelectButton>
                    <div className='numberColumn'>
                        <span className='number'>{fromBalance}</span>
                        <span className='subNumber'>$5,482.12</span>
                    </div>
                </List>
                <Gap height={19} />
                <List>
                    <SelectButton
                        logo={defaultToToken.logo||""}
                    >
                        {defaultToToken.symbol||""}
                    </SelectButton>
                    <div className='numberColumn'>
                        <span className='number'>{toBalance}</span>
                        <span className='subNumber'>$5,482.12</span>
                    </div>
                </List>
                <Gap height={32} />
                <Sbutton onClick={handleRemoveLiquidity}>remove</Sbutton>
            </Wrap>
        </Modal>
    )
});
