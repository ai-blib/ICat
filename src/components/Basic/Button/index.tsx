import React, {useCallback, useState,memo} from 'react';
import classnames from 'classnames';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';

import './index.less'
import {useAuth} from "@/usehooks/useAuth";

interface Props{
    children:any,
    onClick:() => void,
    icon?:any,
    isConnect?:boolean|undefined, //wallet is connect
    loading?:Boolean,
    disabled?:Boolean|undefined,
    disabledGray?:Boolean,
};
export const Sbutton = ({disabledGray,children,onClick,isConnect,disabled,icon}: Props)=>{
    const [loading,setLoading] = useState(false);
    const {plugLogIn,isAuth}:{plugLogIn:Function,isAuth:boolean} = useAuth();
    if (isConnect===undefined){
        isConnect = isAuth;
    }
   if (disabledGray ===undefined){
       disabledGray = false;
   }
   console.log(disabledGray,'disabledGray')
    const handleClick =useCallback(()=>{
         //no connect
        if (!isConnect) {
            plugLogIn&&plugLogIn();
            return;
        };
        if (disabledGray)return;
        const result:unknown = onClick &&onClick();
        if (result instanceof Promise) {
            setLoading(true);
            result.then(completed => {
                    setLoading(false);
            });
        }
    },[isConnect,disabledGray,onClick])
    return <div className='m-button'>
        <ListItemButton>
        <Button
            onClick={handleClick}
            variant="contained"
            color="secondary"
            className={classnames('n-button',{"noConnect":!isConnect||disabledGray})}
            disabled={!!disabled||loading}
            startIcon={icon}
        >
            {loading?<CircularProgress
            size={14}
            color="inherit"
        />:(isConnect?children:'Connect to Plug')}
        </Button>
        </ListItemButton>
    </div>
};
