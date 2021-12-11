import {CommonWrap} from '@/styles'
import {ListDisplay, PositionWrap} from './styles';
import {SmallButton, Tips} from '@/components';
import {useCallback, useEffect, useState} from "react";
import Create from "./Create";
import LiquidityList from './LiquidityList';
import {LiquidityApi} from '@/apis'
import {useAuth} from "@/usehooks/useAuth";
import {withRouter} from "react-router-dom";
import RemoveLiquidityModal from './RemoveLiquidityModal'
export default withRouter(({history}) => {
    const {principal} = useAuth();
    const [display, setDisplay] = useState<boolean>(true);
    const [list, setList] = useState([]);
    const [selectedToken,setSelectedToken] = useState<any>("");
    const [visible,setVisible] = useState<boolean>(false)
    const handleClick = () => {
        setDisplay(false)
    }

    //------------------------methods------
    const handleSelect=useCallback((token)=>{
        setSelectedToken(token);
        if (token.type ==='addLiquidity'){
            setDisplay(false);
        }else if (token.type ==='removeLiquidity'){
            setVisible(true)
        }
    },[]);
    const getUserLPBalances = async () => {
        const result = await LiquidityApi.getUserLPBalances(principal);
        console.log(result,'LiquidityList');
        setList(result);
    }
   const handleClose = useCallback(()=>{
       setVisible(false)
   },[]);
    //---------------watch state-------------
    useEffect(() => {
        if (principal) {
            (async () => await getUserLPBalances())();
        }
    }, [String(principal)]);
    return (
        <CommonWrap width={600}>
            {display ? <ListDisplay visible={display}>
                <Tips  title='Liquidity Provider Rewards'
                      content='Liquidity providers earn a 0.25% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity. If you want to learn review our blog post.'/>
                <PositionWrap>
                <span>
                Your Liquidity Positions
                </span>
                    <SmallButton width={141} onClick={handleClick}>
                        Create Position
                    </SmallButton>
                </PositionWrap>
                <LiquidityList $iconClick={handleSelect} list={list}/>
            </ListDisplay> : <ListDisplay visible={!display}>
                <Create token={selectedToken} goBack={() => setDisplay(true)}/>
            </ListDisplay>}
            {visible? <RemoveLiquidityModal  token={selectedToken}  visible={visible} onClose={handleClose} title={"Remove Liquidity"} />:""}
        </CommonWrap>
    )
})
