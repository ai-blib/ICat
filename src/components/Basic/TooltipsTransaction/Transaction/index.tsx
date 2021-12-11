import {Header, Title, Wrap,InputWrap} from './styles'
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";

export default ({$inputChange}:{$inputChange:Function}) => {

    return <Wrap>
        <Header>Transaction Settings</Header>
        <Title>Slippage Tolerance</Title>
        <div className='row'>
                <button className='btn' onClick={()=>$inputChange('')}>auto</button>
            <div className='inputW'>
                <InputWrap onChange={(e)=>$inputChange&&$inputChange(e.target.value)} placeholder='0.10' />
                <span className='per'>
                    %
                </span>
            </div>
        </div>
    </Wrap>
}
