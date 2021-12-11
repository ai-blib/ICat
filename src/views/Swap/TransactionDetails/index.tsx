import {Header, Wrap} from './styles';
import {memo, useMemo} from "react";
import BigNumber from "bignumber.js";
interface Props {
    info:Object
}
export default memo(({info}:Props)=> {
    // @ts-ignore
    const {minReserved,LiquidityProviderFee,PriceImpact,tolerance,symbol}=info;
    return (<Wrap>
        <Header>Transaction details</Header>
        <ul>
            <li><span>Minimum Received</span> <span>{minReserved} {symbol||""}</span></li>
            <li><span>Price Impact</span> <span>{PriceImpact}</span></li>
            <li><span>Allowed Slippage</span> <span>{new BigNumber(tolerance).times(100).toString()} %</span></li>
            <li><span>Liquidity Provider Fee</span> <span>{LiquidityProviderFee||""} {symbol||""}</span></li>
        </ul>
    </Wrap>)
})
