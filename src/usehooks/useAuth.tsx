import React, {useContext, createContext, useEffect, useState, useCallback} from "react";
import {authClient} from '@/utils/getAgent/identity'
import { Identity } from "@dfinity/agent";
import plugWallet from "../utils/plugWallet";
import {principalToAccountIdentifier} from '@/utils/common';
import {CommonStore} from "@/store/common.store";
// @ts-ignore
import Storage,{walletKeyType} from '../utils/storage'
export interface AuthContext {
    isAuthenticated: boolean;
    isAuthReady: boolean;
    hasCanCanAccount: boolean;
}
export type VariantType = 'default' | 'error' | 'success' | 'warning' | 'info';
export type WalletType = 'II'|'plugWallet';
const II ='II';
const plug = 'plugWallet';
interface Props {
    identity:any,
    isAuthClientReady:boolean,
    principal:string,
    logOut:Function,
    isAuth:boolean,
    plugLogIn:Function,
    subAccountId:string,
    walletType:string,
    userInfo:{
        principal:string,
        subAccountId:string
    }
}
export const useProvideAuth =(authClient):Props=>{
    const [_identity, _setIdentity] = useState<Identity | undefined>();
    const [isAuthClientReady, setAuthClientReady] = useState(false);
    const [principal,setPrincipal] = useState('');
    const [authenticated,setAuthenticated] = useState(false);
    const [subAccountId,setSubAccountId] =useState('');
    const [walletType,setWalletType] = useState<WalletType>('II');
    if (!isAuthClientReady)authClient.create().then(() => setAuthClientReady(true));
    useEffect(() => {
        const type = Storage.getWalletTypeStorage()
        //set wallet type
        if (type===II){

        }else if (type===plug){
            checkPlug()
        }

    }, []);
    //update principal
    useEffect(()=>{
        authClient.setOwnerPrincipal(principal);
    },[principal])
   const checkPlug=async ()=>{
                  // @ts-ignore
        const connected = await window.ic.plug.isConnected();
        // @ts-ignore
       if (connected && !window.ic.plug.agent) {
          await plugLogIn()
                  // @ts-ignore
           // await plugWallet.updateAgentWhitelist();
           // // @ts-ignore
           // const principal = await window?.ic?.plug?.agent?.getPrincipal();
           // // const subAccountId = principalToAccountIdentifier(principal,0);
           // setPrincipal(principal);
           // // setSubAccountId(subAccountId);
           // setAuthenticated(true);
       }

    }

    const plugLogIn =async ():Promise<{ message?: string,status?:number }|undefined>=>{
       const result = await plugWallet.connect();
       if (result){
           // @ts-ignore
           const principal = await window?.ic?.plug?.agent?.getPrincipal();
           // const subAccountId = principalToAccountIdentifier(principal,0);
           setPrincipal(principal);
           // setSubAccountId(subAccountId);
           setAuthenticated(true);
           setWalletType('plugWallet');
           Storage.setWalletTypeStorage('plugWallet');
           return {status:200}
       }else {
           return {message:'connect error'}
       }


    }
    const logOut=async ():Promise<void>=> {
        // if (!authClient.ready) return;
        await authClient.logout();
        setAuthenticated(false);
    }

    const Context = {
       identity:_identity,
       isAuthClientReady,
       principal,
       logOut,
        isAuth: authenticated,
       plugLogIn,
       subAccountId,
       walletType,
       userInfo:{
           principal,
           subAccountId
       }
   }
   //save common data
    CommonStore.actionSave({...Context})
    return Context;
}
const authContext = createContext(null!);
export function ProvideAuth({ children }) {
    const auth = useProvideAuth(authClient);
    // @ts-ignore
    return <authContext.Provider value={Object.assign(auth)}>{children}</authContext.Provider>;
}

export const useAuth=()=>{
    return useContext(authContext)
}
