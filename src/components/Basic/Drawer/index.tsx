import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import React, {useEffect, useMemo, useState} from 'react';
import {DrawerStyles as Styled} from './styles';
import copy from 'copy-to-clipboard';
import Icon from '@/icons/Icon'
import {Sbutton,Gap} from '@/components'

import './index.less'

const tokenId = 'vfk4z-qqaaa-aaaah-aaura-cai'
export const Drawer = (props) => {
    const [state, setState] = useState(false);
    // const {principal, logOut, subAccountId,isAuthClientReady} = useAuth();
    const [text, setText] = useState('Copy');
    const [balance, setBalanceOf] = useState(0);
    const [claim, setClaim] = useState(false);
    //  const sc = useMemo(() => {
    //      return desensitizationPrincipal(String(principal));
    //  }, [principal])
    //  const sc2 = useMemo(() => {
    //      return desensitizationPrincipal(String(subAccountId));
    //  }, [subAccountId])
    //  const handleChange = async (e) => {
    //      if (logOut) {
    //          // @ts-ignore
    //          logOut();
    //      }
    //  }
    //  const isClaimed =async ()=>{
    //    const isClaimed=await FAUCET_API.isClaimed(tokenId,String(principal));
    //    console.log(isClaimed,'isClaimed')
    //      setClaim(isClaimed);
    //      console.log(await FAUCET_API.getRecords(),99);
    //
    //  }
    //  const claimToken = async ()=>{
    //      if (!claim){
    //        const res= await FAUCET_API.claimToken(tokenId);
    //         console.log(res,'claimToken');
    //          if (res){
    //              props.enqueueSnackbar(' add funs success', {variant: 'success'});
    //              return
    //          }
    //          props.enqueueSnackbar('  add funs fail', {variant: 'error'});
    //          return true;
    //      }
    //  }
    //  const copyText = (type) => {
    //      if (type === 1) {
    //          copy(String(subAccountId));
    //          setText('Copy')
    //      } else {
    //          copy(String(principal));
    //          setText('Copy')
    //      }
    //
    //      setTimeout(() => {
    //          setText('Copyed!')
    //      }, 500)
    //  }
    // const getBalanceOf=()=>{
    //      ERC20_API.balanceOf(String(principal)).then((res: bigint) => {
    //          setBalanceOf(Number(res))
    //      });
    //  }
    //  useEffect(() => {
    //      getBalanceOf();
    //      isClaimed()
    //  }, [isAuthClientReady])
    return (
        <>
            <div className='log_success_wrap'>
                <img onClick={() => setState(true)} className='log_success'
                     src="http://nft-ic.oss-cn-shanghai.aliyuncs.com/NFT/1629295689239.png" alt=""/>
            </div>
            <SwipeableDrawer
                className='draw-container'
                anchor={'right'}
                open={state}
                onClose={() => setState(false)}
                onOpen={() => setState(true)}
            >
                <Styled.Container>
                        <Styled.InfoWrap>
                            <Styled.InfoItem>
                                <Styled.InfoSpan>
                                    Account ID
                                </Styled.InfoSpan>
                                <Styled.InfoSpan color='#000000'>
                                    sqa6d-sbjav...6fl7k-bqe
                                </Styled.InfoSpan>
                                <Styled.Cursor>
                                    <Icon name='copy' />
                                </Styled.Cursor>
                            </Styled.InfoItem>
                            <Styled.InfoItem>
                                <Styled.InfoSpan>
                                    Account ID
                                </Styled.InfoSpan>
                                <Styled.InfoSpan color='#000000'>
                                    sqa6d-sbjav...6fl7k-bqe
                                </Styled.InfoSpan>
                                <Styled.Cursor>
                                    <Icon name='copy' />
                                </Styled.Cursor>
                            </Styled.InfoItem>
                        </Styled.InfoWrap>
                        <Gap height={16} />
                        <Styled.BalanceWrap>
                            <Styled.Title>
                                Total Balance
                            </Styled.Title>
                            <Styled.Funs>
                                $ 9000.00 USD
                            </Styled.Funs>
                            <Sbutton onClick={()=>{}} >
                                Add Funs
                            </Sbutton>
                        </Styled.BalanceWrap>
                </Styled.Container>
            </SwipeableDrawer>
        </>
    )
}
