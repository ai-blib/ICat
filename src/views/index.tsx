import { Container, Wrap } from './styles';
import { Header } from '@/components';
import { Route, Switch, Redirect } from "react-router-dom";
import Profile from './Profile'
import Home from './Home'
export default () => {
    return (
        <Wrap>
            <Header />
            <Container className="container">
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/profile" render={() => <Profile />} />
                </Switch>
            </Container>
        </Wrap>
    )
};
