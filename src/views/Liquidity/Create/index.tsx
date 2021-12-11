import {LiHeader, SwapTop, Wrap} from './styles';
import Icon from "@/icons/Icon";
import {
    DisplayResultCard,
    Gap,
    Info,
    Sbutton,
    SwapCard,
    TokenSelectModal,
    Tooltips,
    TooltipsTransaction
} from '@/components';
import {memo, useCallback, useEffect, useMemo, useState} from "react";
import {useMessage} from '@/usehooks/useNotification';
import NoAssetsTip from "./NoAssetsTip";
import {TokenPair, TokenValue} from "@/types/global";
import {AssetsApi, CommonApi, LiquidityApi} from "@/apis";
import {
    calculatePriceImpact,
    debounce,
    formatAmount,
    getAmountIn,
    getAmountOut,
    getLpAmount,
    initDefaultLiquidityToken
} from '@/utils/formate'
import BigNumber from "bignumber.js";
import {withRouter,RouteComponentProps} from "react-router-dom";
import TransactionDetails from "@/views/Swap/TransactionDetails";

interface Props extends RouteComponentProps {
    goBack:Function,
    token:any
}

export default memo(withRouter(({goBack,history,token}:Props) => {
    const {Message}:{ Message: Function } = useMessage();
    //const
    let selectType: unknown = '';
    const {defaultFromToken,defaultToToken} =initDefaultLiquidityToken(token)

    //state
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedFromToken, setSelectedFromToken] = useState<TokenValue | any>(defaultFromToken);
    const [selectedToToken, setSelectedToToken] = useState<TokenValue | any>(defaultToToken);
    const [review, setReview] = useState<boolean>(false);
    const [fromValue, setFromValue] = useState<string | number>('');
    const [toValue, setToValue] = useState<string | number>('');
    const [exChangeAmount, setExChangeAmount] = useState<string | number>('');
    const [fromBalance,setFromBalance] = useState<number>(0);
    const [toBalance,setToBalance] = useState<number>(0);
    const [pairInfo,setPairInfo] = useState<TokenPair | any>('');
    const [tolerance, setTolerance] = useState(0.005);

    const handleClick = () => {
        Message({type: "done", title: "string", content: "string"});
    }

    //---------------------------memo --------------------//
    //@button content
    const buttonText = useMemo(() => {
        if (!review) {
            return 'Review Supply'
        }
        return 'Confirm Supply'

    }, [review]);

    //@is disabled
    const buttonDisabled = useMemo(() => {
        return !(selectedFromToken && selectedToToken && fromValue && toValue)
    }, [selectedFromToken, selectedToToken, fromValue, toValue]);
    const minReserved = useMemo(() => {

        if (!pairInfo || !selectedToToken || !toValue) return "-";
        const {decimals} =selectedToToken;
        let toReserve;
        if (pairInfo.token1 === selectedToToken.id.toString()) {
            toReserve = pairInfo.reserve1;
        } else {
            toReserve = pairInfo.reserve0;
        }
        const val = new BigNumber(toValue).times(1 - tolerance).gt(formatAmount(BigInt(toReserve), Number(decimals)));
        if (val) {
            return new BigNumber(1 - tolerance)
                .times(formatAmount(BigInt(toReserve), Number(decimals)))
                .toFixed(Number(decimals) > 4 ? 4 : Number(decimals));
        } else {
            return new BigNumber(1 - tolerance)
                .times(toValue)
                .toFixed(Number(decimals) > 4 ? 4 : Number(decimals));
        }
    }, [pairInfo, selectedToToken, toValue, tolerance]);
    const LiquidityProviderFee = useMemo(() => {
        return `${new BigNumber(fromValue).times(0.003).toString()} ${selectedFromToken.symbol}`
    }, [fromValue, selectedFromToken])
    const PriceImpact = useMemo(() => {
        if (!pairInfo || !fromValue || !selectedFromToken || !toValue) return;
        let fromReserve, toReserve;
        if (pairInfo.token0 === selectedFromToken.id.toString()) {
            fromReserve = pairInfo.reserve0;
            toReserve = pairInfo.reserve1;
        } else {
            fromReserve = pairInfo.reserve1;
            toReserve = pairInfo.reserve0;
        }
        return  calculatePriceImpact(
            String(fromValue),
            selectedFromToken.decimals.toString(),
            String(toValue),
            selectedToToken.decimals.toString(),
            fromReserve,
            toReserve
        );
    }, [pairInfo, selectedFromToken, fromValue, selectedToToken, toValue]);
    const resultInfo = useMemo(()=>{
        if (!toValue || !fromValue) return;
        const {reserve0, reserve1, totalSupply} = pairInfo;
        const currentLpAmount = getLpAmount(String(fromValue), String(toValue), String(reserve0), String(reserve1), String(totalSupply));
        // // LP% = LP get / pair.totalSupply
        const LpPer = new BigNumber(currentLpAmount).div(new BigNumber(Number(totalSupply))).toFixed(3);
        //---- set display info
        return({
            from: selectedFromToken.logo,
            fromSymbol: selectedFromToken.symbol,
            toSymbol: selectedToToken.symbol,
            to: selectedToToken.logo,
            currentLpAmount,
            LpPer
        });
    },[toValue,fromValue,pairInfo])

    //------------methods-----------------------------------------//


    // get TokenInfo
    const getPairs = async () => {
        const {reserve0, reserve1, totalSupply} = (await LiquidityApi.getPair(selectedFromToken.id, selectedToToken.id))[0];
        setPairInfo({reserve0, reserve1, totalSupply})
        // --token0 exchange token1  token0 = pair.reserve1 / pair.reserve0
        setExChangeAmount(new BigNumber(Number(reserve1)).div(new BigNumber(Number(reserve0))).toFixed(3))
    }

    //close modal
    const CloseModal = useCallback(() => {
        setVisible(false);
    }, []);

    const handleSelect = useCallback((type: any) => {
        ///  review  disabled selected
        if (review) {
            return
        }
        selectType = type;
        setVisible(true);
    }, [review]);
    const handleSelectToken = useCallback((token) => {
        if (selectType === 'one') {
            setSelectedFromToken(token);

        } else if (selectType === 'two') {
            setSelectedToToken(token)
        }
    }, []);
    //----------input change methods
    const fromInputChange = useCallback((value: string) => {
        setFromValue(value);
        debounce(async () => {
            if (!value) {
                setToValue('');
                return;
            }
            onFromValueChangeSetToValue(value);
        }, 500)
    }, [selectedFromToken, selectedToToken, exChangeAmount]);
    const onFromValueChangeSetToValue=useCallback((val:string)=>{
        let fromReserve, toReserve;
        if (pairInfo.token0 === selectedFromToken.id.toString()) {
            fromReserve = pairInfo.reserve0;
            toReserve = pairInfo.reserve1;
        } else {
            fromReserve = pairInfo.reserve1;
            toReserve = pairInfo.reserve0;
        }
        const amount = getAmountOut(
            val,
            selectedFromToken.decimals.toString(),
            selectedToToken.decimals.toString(),
            fromReserve,
            toReserve
        );
        setToValue(amount)
    },[pairInfo])

    const toInputChange = useCallback((value: string) => {
        setToValue(value);
        debounce(() => {
            if (!value) {
                setFromValue('');
                return;
            }
            onToValueChangeSetFromValue(value);
        }, 500)

    }, [selectedFromToken, selectedToToken, exChangeAmount]);
    const onToValueChangeSetFromValue=useCallback((val:string)=>{
        let fromReserve, toReserve;
        if (pairInfo.token0 === selectedFromToken.id.toString()) {
            fromReserve = pairInfo.reserve0;
            toReserve = pairInfo.reserve1;
        } else {
            fromReserve = pairInfo.reserve1;
            toReserve = pairInfo.reserve0;
        }
        const amount = getAmountIn(
            val,
            selectedFromToken.decimals.toString(),
            selectedToToken.decimals.toString(),
            fromReserve,
            toReserve
        );
        setFromValue(amount)
    },[pairInfo])

    const handleGoBack = useCallback(()=>{
        if (review){
            setReview(false);
            return;
        }
        goBack&&goBack()
    },[review]);

     //---------------------@api methods---------------------
    const handleSubmit =useCallback( async () => {
        if (!review) {
            // await getTokenInfo();
            setReview(true);
            return
        };
        const result = await LiquidityApi.addLiquidity(
            selectedFromToken.id.toString(),
            selectedToToken.id.toString(),
            String(fromValue),
            String(toValue),
            new BigNumber(fromValue).times(0.995).toString(),
            new BigNumber(toValue).times(0.995).toString(),
            Number(selectedFromToken.decimals),
            Number(selectedToToken.decimals));
        if (result.err){
            const title =`add Liquidity ${fromValue} ${selectedFromToken.symbol} width  ${toValue} ${selectedToToken.symbol}`;
            Message({type: "error", title, content: result.err});
        }
        return
    },[review]);
    const getBalanceOf = async () => {
        const fromTokenId = selectedFromToken.id;
        const toTokenId = selectedToToken.id;
        if (fromTokenId){
            AssetsApi.balanceOf(fromTokenId).then((tokenBalance)=>{
                setFromBalance(Number(tokenBalance))
            });
        }
        if (toTokenId){
            AssetsApi.balanceOf(toTokenId).then((tokenBalance)=>{
                setToBalance(Number(tokenBalance))
            });
        }

    }
    ///----------------------------watch state----------------------------------
    useEffect(() => {
        if (selectedFromToken && selectedToToken) {
            //get pair info
            debounce(() => {
                (async () => (await getPairs()))();
            }, 500)
        }
    }, [selectedFromToken, selectedToToken]);

    useEffect(() => {
        (async () => (await getBalanceOf()))();
    }, [selectedFromToken,selectedToToken]);

    return (
        <Wrap>
            <LiHeader>
                <SwapTop>
                    <span onClick={handleGoBack}>
                         <Icon name='back'/>
                    </span>
                    <span className="swapTitle">
                    Add Liquidity
               </span>
                    <TooltipsTransaction $transactionChange={(value) => setTolerance(value)}>
                        <Icon name='tool'/>
                    </TooltipsTransaction>
                </SwapTop>
            </LiHeader>
            <Gap height={20}/>
            <NoAssetsTip onClick={()=>history.push('/assets')}/>
            <SwapCard balance={fromBalance} type='one' inputDisabled={review} tokenValue={selectedFromToken}
                      inputValue={fromValue}
                      $onInputChange={fromInputChange} $handleSelect={handleSelect}
                      guide='grayAdd'/>
            <Gap height={10}/>
            <SwapCard balance={toBalance} inputValue={toValue} type='two' inputDisabled={review} tokenValue={selectedToToken}
                      $onInputChange={toInputChange} $handleSelect={handleSelect}
                      guide={review ? 'equal' : undefined}/>
            <Gap height={10}/>
            {/*result token*/}
            {review && <><DisplayResultCard info={resultInfo}/>
                <Gap height={10}/>
            </>}
            {/*info*/}
            {selectedFromToken && selectedToToken &&
            <Info icon={'smallAdd'} exChangeAmount={exChangeAmount} from={selectedFromToken.symbol}
                  warnIcon={<Tooltips  content={<TransactionDetails info={{minReserved,LiquidityProviderFee,PriceImpact,tolerance,symbol:selectedToToken?.symbol}}  />}>
                      <Icon name='warn'/>
                  </Tooltips>}
                  to={selectedToToken.symbol}/>}
            {/*//@ button click*/}
            <Sbutton disabled={buttonDisabled} onClick={handleSubmit}>
                {buttonText}
            </Sbutton>
            {/*select token modal*/}
            <TokenSelectModal onselect={handleSelectToken} visible={visible} onClose={CloseModal} title='Select Token'/>
        </Wrap>
    )
}));
