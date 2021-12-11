import React, {memo, useEffect, useState} from "react";
import {Empty, Image, RenderWrap, Row, Title, Wrap} from './styles';
import Box from '@mui/material/Box';
import {AssetsApi, CommonApi} from '@/apis'
import Icon from "@/icons/Icon";
import {getCurrencyString} from '@/utils/formate';
import {TokenInfo} from '@/types/global'
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import {TextLoading} from '@/components'
const RenderRow = (props) => {
    const {index, style, data,$iconClick} = props;
    const space = style.top + ((index + 1) * 25);
    const {symbol,decimals,fee,id,logo,bal} = data[index];
    const [tokenLogo, setTokenLogo] = useState<string>('');
    useEffect(():any => {
        let isUnmount = false
        if (id&&!logo) {
            CommonApi.getMetadata(id).then((res) => {
                if (!isUnmount){
                    setTokenLogo(res.logo);
                }
            })
        }
        return ()=>isUnmount =true;
    }, [id,logo])
    return (
        <RenderWrap style={{...style, top: space}}>
            {/*<Image className='iconFirst' src={'../../public/assets/ICP.png'} alt=""/>*/}
            {/*<Image className='iconSecond' src={'../../public/assets/ICP.png'} alt=""/>*/}
            <Row>
                {logo?<Image className='iconFirst' src={logo||tokenLogo} alt=""/>:<span />}
                <div className='iconWrap'>
                    <Title>{symbol}</Title>
                </div>
            </Row>

            <div className='columnInfo'>
                <div className='title'>Amount</div>
                <div className='number'>{bal?getCurrencyString(bal,decimals,4):<TextLoading loading={true} /> }</div>
            </div>
            <div className='columnInfo'>
                <div className='title'>Price</div>
                <div className='number'>{Number(fee)}</div>
            </div>
            <div className='row'>
                <span onClick={()=>$iconClick&&$iconClick({...data[index],type:'withDraw'})} className='reduce'>
                     <Icon name='reduce'/>
                </span>
                <span onClick={()=>$iconClick&&$iconClick({...data[index],type:'deposit'})} className='add'>
                    <Icon name='add'/>
              </span>
            </div>
        </RenderWrap>
    );
}

interface Props {
    list:TokenInfo[],
    $iconClick:Function
};
export default memo(({list,$iconClick}: Props) => {

    return (

        <Wrap>
            {!list.length ? <Empty>You have no liquidity positions</Empty> : ""}
            <Box
                sx={{width: '100%', height: "100%", bgcolor: 'transparent'}}
            >
                <FixedSizeList
                    itemData={list}
                    height={229}
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
});
