import {Header,AEmpty,List,Date,ListItem,Container} from './styles'
import {CommonWrap} from "@/styles";
import {DoubleIcon} from '@/components'
import React, {useEffect} from "react";
import Cart3d from '../../utils/animations3D';
export default () => {
    useEffect(()=>{
        new Cart3d().start();
    },[])
    return (
        <CommonWrap width={600}>
                <Container id='canvas'>

                </Container>
        </CommonWrap>
    )

}
