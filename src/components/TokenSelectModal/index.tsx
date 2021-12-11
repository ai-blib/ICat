import React, {memo, useEffect, useState} from "react";
import {Modal, SearchInput} from '../';
import {Des, Image, Number, RenderWrap, Title, Wrap} from './styles';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import {TokenValue} from '@/types/global'
import {AssetsApi, CommonApi} from '@/apis';
import {getCurrencyString} from '@/utils/formate'
import {TextLoading,Loading} from '@/components'

const RenderRow =memo( (props: ListChildComponentProps) => {
    const {index, style, data, onClick} = props;
    const space = style.top + ((index + 1) * 25);
    const [logo, setLogo] = useState<string>('');
    const [balance,setBalance] = useState<number|BigInt|null>(null);
    const info = data[index];
    useEffect(():any => {
        let isUnmount = false;      //这里插入isUnmount
        if (info) {
            CommonApi.getTokenInfo(info.id).then((res) => {
                if (!isUnmount&&res.metadata){
                    setLogo(res.metadata.logo);
                    info.logo = res.metadata.logo;
                }
            });
            CommonApi.balanceOf(info.id).then((res) => {
                if (!isUnmount){
                    setBalance(res);
                    info.balance = res;
                }
            });
            return ()=>isUnmount = true;
        }
        return ()=>isUnmount = true;
    }, [info.id]);
    return (
        <ListItemButton onClick={() => onClick && onClick(info)} style={{...style, top: space}}>
            <RenderWrap>
                <div className='iconWrap'>
                    {logo?<Image src={logo} alt=""/>:<span />}
                    <Title className='ho'>{info.symbol}</Title>
                    <Des className='des ho'>{info.name}</Des>
                </div>
                <Number className='ho'>
                    {balance===null?<TextLoading loading={true} />:balance||(balance)==(0)?getCurrencyString(balance, info.decimals, 3):"--"   }
                </Number>
            </RenderWrap>
        </ListItemButton>
    );
})

interface Props {
    title: string,
    visible: boolean,
    onClose: () => void,
    onselect: (e: any) => void
};
export const TokenSelectModal = memo(({title, visible, onClose, onselect}: Props) => {
    const [list, setList] = useState<TokenValue[]|null>(null);
    const getList = async () => {
        setList(await AssetsApi.getTokens());
    }
    useEffect(() => {
        getList();
    }, [])
    return (
        <Modal header={title}
               onClose={() => onClose && onClose()}
               visible={visible}

        >
            <Wrap>
                <SearchInput placeholder='Search by name or canister id'/>
                <Box
                    sx={{width: '100%', height: "100%", bgcolor: '#1E1E1E',display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                    {list === null ? <Loading loading={true}/> : <FixedSizeList
                        itemData={list}
                        height={229}
                        width={440}
                        itemSize={46}
                        itemCount={list.length}
                        overscanCount={5}
                    >
                        {({data, index, style}) => (
                            <RenderRow key={index} onClick={(e) => {
                                onClose && onClose(), onselect(e)
                            }} index={index} style={style}
                                       data={data}/>
                        )}

                    </FixedSizeList>
                    }
                </Box>
            </Wrap>
        </Modal>
    )
});
