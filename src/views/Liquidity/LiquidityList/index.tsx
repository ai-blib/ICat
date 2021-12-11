import React, {memo, useEffect, useState} from "react";
import {RenderWrap, Row, Title, Wrap} from './styles';
import {TokenPair} from '@/types/global'
import Box from '@mui/material/Box';
import Icon from "@/icons/Icon";
import {DoubleIcon, Gap} from "@/components";
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import {CommonApi} from '@/apis'
import {Empty} from "@/views/Assets/List/styles";

const defaultTokenInfo = {fromToken:{}, toToken:{},symbol:"" }
const RenderRow = ({data, index, style,$iconClick}: ListChildComponentProps) => {
    const space = style.top + ((index + 1) * 25);
    const {lptokens, token0, token1} = data[index];

    const [tokenInfo, setTokenInfo] = useState<{fromToken:any, toToken:any,symbol:string }>(defaultTokenInfo);
    useEffect(():any => {
        let isUnmount = false;
        if (tokenInfo) {
            Promise.all([token0, token1].map((tokenCanisterId) => CommonApi.getMetadata(tokenCanisterId))).then((r) => {
                const _info = {fromToken:r[0],toToken:r[1],symbol:`${r[0].symbol||""}/${r[1].symbol||""}`}
                 if (!isUnmount){
                     setTokenInfo(_info);
                 }
            });
        }
        return ()=> isUnmount = true;
    }, [token0, token1])
    return (
        <RenderWrap style={{...style, top: space}}>
            {/*<Image className='iconFirst' src={'../../public/assets/ICP.png'} alt=""/>*/}
            {/*<Image className='iconSecond' src={'../../public/assets/ICP.png'} alt=""/>*/}
            <Row>
                <DoubleIcon top={tokenInfo?.fromToken?.logo} bottom={tokenInfo?.toToken?.logo}/>
                <div className='iconWrap'>
                    <Title>{tokenInfo.symbol}</Title>
                </div>
            </Row>

            <div className='columnInfo'>
                <div className='title'>LP Tokens</div>
                <div className='number'>{Number(lptokens)}</div>
            </div>
            <div className='columnInfo'>
                <div className='title'>Fees Earned</div>
                <div className='number green'>--</div>
            </div>
            <div className='row'>
                <span onClick={()=>$iconClick&&$iconClick({...data[index],...tokenInfo,type:'removeLiquidity'})} className='reduce'>
                     <Icon name='reduce'/>
                </span>
                <span onClick={()=>$iconClick&&$iconClick({...data[index],...tokenInfo,type:'addLiquidity'})} className='add'>
                    <Icon name='add'/>
              </span>
            </div>
        </RenderWrap>
    );
}

interface Props {
    list: TokenPair[],
    $iconClick:Function
};
export default memo(({list,$iconClick}: Props) => {
    return (
        <Wrap>
            {!list.length ? <Empty>You have no liquidity positions</Empty> : ""}
            <Box
                sx={{width: '100%', height: "100%", bgcolor: 'transparent'}}
            >
                <Gap height={20}/>
                <FixedSizeList
                    itemData={list}
                    height={800}
                    itemSize={80}
                    itemCount={list.length}
                    overscanCount={5}
                >
                    {({data, index, style}) => (
                        <RenderRow $iconClick={$iconClick} key={index} index={index} style={style}
                                   data={data}/>
                    )}

                </FixedSizeList>
            </Box>
        </Wrap>

    )
})
