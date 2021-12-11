import {LiHeader, SwapTop, Wrap} from './styles';
import Icon from "@/icons/Icon";
import {Gap, Sbutton, SwapCard, TokenSelectModal} from '@/components';
import {useCallback, useEffect, useMemo, useState} from "react";
import {useMessage} from '@/usehooks/useNotification';
import {TokenValue} from '@/types/global';
import {AssetsApi,CommonApi} from '@/apis';
import {TokenInfo} from '@/types/global';
interface Token  extends TokenInfo{
    type:'withDraw'|"deposit"
}
 type mode='deposit'|'withDraw'
const swap_canisterId = process.env.REACT_APP_SWAP_CANISTER_ID || "";
export default ({goBack,token}: { goBack: Function,token?:any|Token }) => {
    // const
    const {Message}: { Message: Function } = useMessage();
    const typeMode: mode  = token && token.type || 'deposit';

    //state
    const defaultApprove =typeMode ==='withDraw';
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedToken, setSelectedToken] = useState<TokenValue | any>(token);
    const [approve, setApprove] = useState<boolean>(defaultApprove);
    const [amount, setAmount] = useState<string>("");
    const [balanceOf,setBalanceOf ] =useState<number|null>(null)



    //----------------------memo----------------------------------------//
    const ApproveText:string = useMemo(() => {
        const {symbol} = selectedToken;
        if (!selectedToken) {
            return 'Pending Asset Selection'
        } else if (!amount)  {
            return `Enter your amount`
            // Insufficient DAI balance
        }else {
            return `Allow use of your ${symbol}`
        }
    }, [selectedToken,amount]);
    const disabledGray = useMemo(()=>{
        return (!!!selectedToken)||!amount || approve
    },[selectedToken,amount,approve])
    // already selected token
    const quickDepositAndWithdraw:boolean= useMemo(()=>{
        return selectedToken&&selectedToken.type==='withDraw'

    },[]);
    // button content
    const buttonText =useMemo(()=>{
               return typeMode;
    },[])
    //---------------------@methods--------------------------------
    const handleApprove = useCallback(async () => {
        const {id, decimals} = selectedToken;
        const result = await CommonApi.approve(id, swap_canisterId, '10000000000', decimals);
        if (result.err) {
            Message({type: "error", title: `${ApproveText} failed`, content: JSON.stringify(result.err)});
        } else {
            setApprove(true);
            Message({type: "success", title: `${ApproveText} success`, content:''});
        }
        return result;
    }, [selectedToken,amount]);
    //close modal
    const CloseModal = useCallback(() => {
        setVisible(false);
    }, []);
    // select
    const handleSelect = useCallback(() => {
        setVisible(true);
    }, []);
    const handleSelectToken = useCallback(async (token) => {
        setSelectedToken(token);
    }, []);
    const handleInputValue = useCallback((value) => {
        setAmount(value);
    }, []);
    const handleSubmit = useCallback(async ()=>{
          if (typeMode ==='deposit'){
             await handleDeposit();
          }else if (typeMode ==='withDraw'){
             await handleWithDraw()
          }
    },[approve, amount,balanceOf,selectedToken])
    // -------------------@api methods-------------------------------------------
    //deposit
    const handleDeposit = async () => {
        if (!balanceOf){
            Message({type: "error", title: `deposit error`, content: 'balance no enough'});
            return;
        }
        const {id, decimals} = selectedToken;
        const result = await AssetsApi.deposit(id, amount, decimals);
        if (result.err) {
            Message({type: "error", title: `deposit fail`, content: result.err});
        }else {
            Message({type: "success", title: `deposit success`, content:''});
        }
        await getBalanceOf();
    };
    //widthDraw
    const handleWithDraw = async ():Promise<undefined> => {
        if (!balanceOf){
            Message({type: "error", title: `withDraw error`, content: 'balance no enough'});
            return;
        }
        const {id, decimals} = selectedToken;
        const result = await AssetsApi.withDraw(id, amount, decimals);
        if (result.err) {
            Message({type: "error", title: `withDraw error`, content: result.err});
        }else {
            Message({type: "success", title: `withDraw success`, content:''});
        }
        await getBalanceOf();
    };
    //your wallet BalanceOf or swap BalanceOf
    const getBalanceOf = async () => {
        const {id} = selectedToken||{};
        if (!id) return;
        let yourBalance:number|bigint = 0;
        // true swap BalanceOf. false wallet balanceOf
        setBalanceOf(null);
        if (typeMode ==='withDraw'){
           // swap BalanceOf
            yourBalance = await AssetsApi.balanceOf(id);
        }else {
           // wallet balanceOf
            yourBalance = await CommonApi.balanceOf(id);
        }
        if (yourBalance) {
            setBalanceOf(Number(yourBalance));
            // Message({type: "success", title: `${ApproveText} success`, content: result.err});
        }
    }

    //-------------------watcher state--------------------//
    useEffect(() => {
        if(selectedToken){
            (async () => (await getBalanceOf()))();
        }
    }, [selectedToken]);
    return (
        <Wrap>
            <LiHeader>
                <SwapTop>
                    <span onClick={() => goBack && goBack()}>
                         <Icon name='back'/>
                    </span>
                    <span className="swapTitle">
                     Deposit Asset
               </span>
                    <div>
                        {/*<Icon name='tool'/>*/}
                    </div>
                </SwapTop>
            </LiHeader>
            <Gap height={20}/>
            <SwapCard  balance={balanceOf} balanceIcon={!quickDepositAndWithdraw?'smallPlug':'currency'} $onInputChange={handleInputValue}  tokenValue={selectedToken} $handleSelect={handleSelect}/>
            <Gap height={20}/>
            {!quickDepositAndWithdraw&&<Sbutton key={0} disabledGray={disabledGray}  onClick={handleApprove}>
                {ApproveText}
            </Sbutton>}
            <Gap height={20}/>
            <Sbutton key={1} disabledGray={!approve} onClick={handleSubmit}>
                {buttonText}
            </Sbutton>
            {/*modal*/}
            <TokenSelectModal onselect={handleSelectToken} visible={visible} onClose={CloseModal} title='Select Token'/>
            {/*<TipModal  />*/}
        </Wrap>
    )
};
