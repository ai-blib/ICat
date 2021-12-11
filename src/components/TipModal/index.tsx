import {Modal} from "@/components";
import {TipWrap} from "./styles";
import {memo} from "react";
import './reWrite.less';
import ConfirmContent from './ConfirmContent';
import ProgressContent from './ProgressContent';
export const TipModal = memo(() => {
    return (
        <Modal onClose={() => {
        }}
               visible={true} header='' className='tipModal'>
            <TipWrap>
                {/*<ConfirmContent/>*/}
                <ProgressContent status='deposit' />
            </TipWrap>
        </Modal>
    )
})
