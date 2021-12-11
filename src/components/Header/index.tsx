import {Sheader, Wrap, Connect, Layout} from './styles'
import {Avatar} from '@/components';
import {useCallback, useMemo} from 'react'
import Logo from "./logo";
import {useAuth} from "@/usehooks/useAuth";
import {desensitizationPrincipal} from '@/utils/formate'
import {Principal} from "@dfinity/agent";
import {Tooltips} from '@/components';
import Icon from '@/icons/Icon'

interface Props {
     Id:string
};
const Menus = ({Id}:Props) => {
        const {principal,logOut}: {  principal: Principal,logOut:Function} = useAuth();
    const handleLayOut = useCallback(() => {
        logOut && logOut()
    }, [])
        const sc:string = useMemo(() => {
            return desensitizationPrincipal(String(principal),8);
        }, [String(principal)]);
    return <Layout>
        <ul>
            <li>
                {sc}
            </li>
            <li>
                <span className='icon'><Icon name='copy'/></span>
                <span>Copy ID</span>
            </li>
            <li onClick={handleLayOut}>
                <span className='icon'><Icon name='disconnect'/></span>
                <span>Disconnect</span>
            </li>
        </ul>
    </Layout>
}


export const Header = () => {
    const {plugLogIn, isAuth, principal, logOut}: { plugLogIn: Function, isAuth: boolean, principal: Principal, logOut: Function } = useAuth();
    const handleClick = () => {
        // @ts-ignore
        plugLogIn && plugLogIn()
    }
    const sc:string = useMemo(() => {
        return desensitizationPrincipal(String(principal));
    }, [String(principal)]);

    return (
        <Sheader>
            <Logo/>
            <div>
            </div>
            <Wrap>
                {isAuth ?
                    <Tooltips content={<Menus Id={sc}  />}>
                        < Avatar text={sc}/>
                    </Tooltips> :
                    <Connect onClick={handleClick} src='../../public/assets/plug.png'/>
                }
            </Wrap>
        </Sheader>
    )
}
