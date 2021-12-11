import {CommonWrap} from '@/styles'
import { ListDisplay, PositionWrap} from './styles';
import { SmallButton,Tips,Loading} from '@/components';
import {useCallback, useEffect, useState} from "react";
import Create from "./Create";
import List from './List';
import {AssetsApi} from "@/apis";
import {useAuth} from "@/usehooks/useAuth";
import {TokenInfo} from '@/types/global';
import {defaultTokenList} from '@/config'
interface Token  extends TokenInfo{
    type:'widthDraw'|"deposit"
}
export default () => {
    const {principal} = useAuth();
    const [list, setList] = useState<TokenInfo[]>([...defaultTokenList]);
    const [display,setDisplay] = useState<boolean>(true);
    const [selectedToken,setSelectedToken] = useState<Token|string>("");
    const handleClick = ()=>{
        setDisplay(false);
        setSelectedToken("");

    }
    const getList = async () => {
        const list = await AssetsApi.getUserInfoByNamePageAbove(principal);
        setList(list);
    }
    const handleSelect=useCallback((token)=>{
        setSelectedToken(token);
        setDisplay(false);
        },[])
    useEffect(() => {
         if(!principal){
              return
         }
        (async ()=>await getList())();
    }, [String(principal),display])
    return (
        <CommonWrap width={600}>
            {display?<ListDisplay visible={display}>
                <Tips title='Assets Details'
                      content='need some text here describing what assets tab does and how to use it'/>
                <PositionWrap>
                <span>
                Your Assets
                </span>
                    <SmallButton width={141} onClick={handleClick}>
                        Deposit Asset
                    </SmallButton>
                </PositionWrap>
                <List $iconClick={handleSelect} list={list} />
            </ListDisplay>:<ListDisplay   visible={!display}>
                <Create token={selectedToken} goBack={()=>setDisplay(true)} />
            </ListDisplay>}
        </CommonWrap>
    )
}
