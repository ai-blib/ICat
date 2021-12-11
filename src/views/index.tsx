import {Container, Wrap} from './styles';
import {NavBar,Header} from '@/components';
import {Route,Switch,Redirect} from "react-router-dom";
import Assets from './Assets';
import Swap from './Swap';
import Liquidity from './Liquidity';
import Activity from './Activity';
export default () => {
    return (
        <Wrap>
            <Header/>
            <NavBar />
            <Container className="container">
                <Switch>
                    <Route path="/assets"  render={()=> <Assets />}/>
                    <Route path="/swap" render={()=> <Swap />} />
                    <Route path="/liquidity" render={()=> <Liquidity />} />
                    <Route path="/activity" render={()=> <Activity />} />
                </Switch>
                {/*<Route path="/swap/exchange" render={() => <SwapExchangeWrap />} />*/}
            </Container>
        </Wrap>
    )
};
