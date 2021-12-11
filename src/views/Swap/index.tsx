import {SwapHeader, SwapLazy, SwapTop} from './styles';
import {CommonWrap} from "@/styles";
import Icon from "@/icons/Icon";
import {Gap, Info, Sbutton, SwapCard, Switch, TokenSelectModal, Tooltips, TooltipsTransaction,TipModal} from '@/components';
import {memo, useCallback, useEffect, useMemo, useState} from "react";
import {useMessage} from '@/usehooks/useNotification';
import {TokenPair, TokenValue} from "@/types/global";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {debounce, getAmountIn, getAmountOut,calculatePriceImpact,formatAmount} from "@/utils/formate";
import BigNumber from "bignumber.js";
import {AssetsApi, CommonApi, SwapApi} from "@/apis";
import TransactionDetails from './TransactionDetails';

interface Props extends RouteComponentProps {
}

export default withRouter(memo(({history}: Props) => {
    const {Message}: { Message: Function } = useMessage();
    let selectType: unknown = '';
    //--------------------state
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedFromToken, setSelectedFromToken] = useState<TokenValue | any>('');
    const [selectedToToken, setSelectedToToken] = useState<TokenValue | any>('');
    const [review, setReview] = useState<boolean>(false);
    const [fromValue, setFromValue] = useState<string | number>('');
    const [toValue, setToValue] = useState<string | number>('');
    const [exChangeAmount, setExChangeAmount] = useState<string | number>('');
    const [pairInfo, setPairInfo] = useState<TokenPair | any>("");
    const [tolerance, setTolerance] = useState(0.005);
    const [fromBalance,setFromBalance] = useState<number>(0);
    const [toBalance,setToBalance] = useState<number>(0);

    //---------------------------memo --------------------//
    //@button content
    const buttonText = useMemo(() => {
        if (!review) {
            return 'Review Swap'
        }
        return 'Confirm Swap'

    }, [review]);
    const minReserved = useMemo(() => {

        if (!pairInfo || !selectedToToken || !toValue) return "-";
        const {decimals} =selectedToToken;
        let toReserve;
        if (pairInfo.token1 === selectedToToken.id.toString()) {
            toReserve = pairInfo.reserve1;
        } else {
            toReserve = pairInfo.reserve0;
        }
        if (
            new BigNumber(toValue)
                .times(1 - tolerance)
                .gt(formatAmount(BigInt(toReserve), Number(decimals)))
        ) {
            return new BigNumber(1 - tolerance)
                .times(formatAmount(BigInt(toReserve), Number(decimals)))
                .toFixed(Number(decimals) > 4 ? 4 : Number(decimals));
        } else {
            return new BigNumber(1 - tolerance)
                .times(toValue)
                .toFixed(Number(decimals) > 4 ? 4 : Number(decimals));
        }
    }, [pairInfo, selectedToToken, toValue, tolerance]);

    //@is disabled
    const buttonDisabled = useMemo(() => {
        return !(selectedFromToken && selectedToToken && fromValue && toValue)
    }, [selectedFromToken, selectedToToken, fromValue, toValue]);
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


    //--------------------------------methods--------------------------------//

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
    //-input change methods
    const fromInputChange = useCallback((value: string) => {
        setFromValue(value);
        debounce(()=>{
            if (!value) {
                setToValue('');
                return;
            }
            onFromValueChangeSetToValue(value);

        },500)

    }, [selectedFromToken, selectedToToken, exChangeAmount,pairInfo]);
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
            onToValueChangeSetFromValue(value)
        }, 500)

    }, [selectedFromToken, selectedToToken, exChangeAmount,pairInfo]);

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
    const handleExChangeToken = useCallback(() => {
        if (review) {
            return
        };
        setFromValue(toValue);
        onFromValueChangeSetToValue(String(toValue));
        setSelectedFromToken(selectedToToken);
        setSelectedToToken(selectedFromToken);
        setFromBalance(toBalance);
        setToBalance(fromBalance);

    }, [toValue, selectedToToken, selectedFromToken,toBalance,fromBalance]);
   //-----------------------------@api methods----------------
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
    //@ button click
    const handleSubmit = useCallback(async () => {
        if (!review) {
            setReview(true);
            return
        };
        const amountOutMin = new BigNumber("1")
            .minus(new BigNumber(tolerance))
            .multipliedBy(new BigNumber(toValue))
            .dp(Number(selectedToToken.decimals))
            .toString();
        const amountInMax = new BigNumber("1")
            .minus(new BigNumber(tolerance))
            .multipliedBy(new BigNumber(fromValue))
            .dp(Number(selectedToToken.decimals))
            .toString();
        const result = await SwapApi.swap(
            selectedFromToken.id.toString(),
            selectedToToken.id.toString(),
            String(fromValue),
            String(toValue),
            amountOutMin,
            amountInMax,
            Number(selectedFromToken.decimals),
            Number(selectedToToken.decimals));
        const title = `swap ${fromValue} ${selectedFromToken.symbol} width  ${toValue} ${selectedToToken.symbol}`;
        if (result.err) {
            Message({type: "error", title, content: JSON.stringify(result.err)});
        }else {
            Message({type: "success", title, content: ""});
        }
        return
    }, [review, tolerance]);

    // get TokenInfo
    const getPairs = async () => {
          const  result = (await CommonApi.getPair(selectedFromToken.id, selectedToToken.id))[0];
           setPairInfo(result)
        const {reserve0, reserve1} = result
        // --token0 exchange token1  token0 = pair.reserve1 / pair.reserve0
        const ecAmount = new BigNumber(Number(reserve1)).div(new BigNumber(Number(reserve0))).toFixed(3);
        setExChangeAmount(ecAmount)
        return {pairInfo,ecAmount};
    }
    //--------------------------------methods END--------------------------------//

    ///---------------------------------watch state----------------------------------
    useEffect(() => {
        if (selectedFromToken && selectedToToken) {
            //get pair info
                (async () => (await getPairs()))();
        }
    }, [selectedFromToken, selectedToToken]);


    useEffect(() => {
        (async () => (await getBalanceOf()))();
    }, [selectedFromToken,selectedToToken]);
    return (
        <CommonWrap>
            <SwapHeader>
                <SwapTop>
                    <div/>
                    <span className="swapTitle">
                    Swap
               </span>
                    <TooltipsTransaction $transactionChange={(value) => setTolerance(value)}>
                        <Icon name='tool'/>
                    </TooltipsTransaction>
                </SwapTop>
                <SwapLazy>
                    <div className="lazyText">
                        <span>Lazy Swap</span>
                        <Icon name='warn'/>
                    </div>
                    <div>
                        <Switch checked={false} leftText='On' rightText='Yes' onChange={() => {
                        }}/>
                    </div>
                </SwapLazy>
            </SwapHeader>
            <Gap height={20}/>
            <SwapCard type='one'
                      balance={fromBalance}
                      inputDisabled={review}
                      tokenValue={selectedFromToken}
                      inputValue={fromValue}
                      selected={review}
                      $onInputChange={fromInputChange}
                      $handleSelect={handleSelect}
                      $guideClick={handleExChangeToken}
                      subText={review && 'Swap from'}
                      guide='downArrow'/>
            <Gap height={10}/>
            <SwapCard inputValue={toValue}
                      balance={toBalance}
                      type='two'
                      borderColor={review ? '#3D52F4' : ""}
                      inputFontColor={review ? '#F6FCFD' : ""}
                      subText={review && 'Swap to'}
                      inputDisabled={review}
                      tokenValue={selectedToToken}
                      $onInputChange={toInputChange}
                      $handleSelect={handleSelect}
            />
            <Gap height={20}/>
            {selectedFromToken && selectedToToken &&
            <Info icon={'smallAdd'}
                  exChangeAmount={exChangeAmount}
                  from={selectedFromToken.symbol}
                  to={selectedToToken.symbol}
                  warnIcon={<Tooltips  content={<TransactionDetails info={{minReserved,LiquidityProviderFee,PriceImpact,tolerance,symbol:selectedToToken?.symbol}}  />}>
                      <Icon name='warn'/>
                  </Tooltips>}
            />}
            <Sbutton disabled={buttonDisabled} onClick={handleSubmit}>
                {buttonText}
            </Sbutton>
            {/*modal*/}
            <TokenSelectModal onselect={handleSelectToken} visible={visible} onClose={CloseModal} title='Select Token'/>
            {/*<TipModal  />*/}
        </CommonWrap>
    )
}));
