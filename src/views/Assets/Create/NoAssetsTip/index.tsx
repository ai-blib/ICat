import {Content, TipButton, TipWrap, Title} from './styles'
import {SmallButton,Gap} from "@/components";

export default () => {
    return (
        <TipWrap>
            <Title>You have no assets deposited</Title>
            <Content>In order to swap without using Plug assets you need to deposit into Sonic. After doing so you can
                swap.</Content>
            <Gap height={10} />
            <SmallButton height={40} radius={10} onClick={()=>{}}>Deposit Assets</SmallButton>
        </TipWrap>
    )
}
