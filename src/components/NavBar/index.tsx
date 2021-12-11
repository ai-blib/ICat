import { Nav, Navbar } from './styles';
import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter, NavLink } from "react-router-dom";

const navs = ['Assets', "Swap", "Liquidity", "Activity"];
const defaultRoute = 'assets'
interface Props extends RouteComponentProps {
}

export const NavBar = withRouter(({ history, location }: Props) => {
    const [active, setActive] = useState(defaultRoute)
    useEffect(() => {
        history.push(`/${active.toLocaleLowerCase()}`);
    }, [active]);
    useEffect(() => {
        let nav = location.pathname;
        if (nav === '/') {
            nav = `/${defaultRoute}`;
        }
        history.push(nav);
        setActive(nav.replace('/', ''))
    }, [])
    return (
        <Navbar>
            {navs.map((nav, index) => {
                const to = `/${nav.toLocaleLowerCase()}`
                return (<NavLink key={nav + index} isActive={() => active === nav.toLocaleLowerCase()} activeClassName="ac" to={to}>
                    <Nav key={nav} onClick={() => setActive(nav.toLocaleLowerCase())} active={active === nav.toLocaleLowerCase()}>
                        {nav}
                    </Nav>
                </NavLink>)
            })}

        </Navbar>
    )
})
