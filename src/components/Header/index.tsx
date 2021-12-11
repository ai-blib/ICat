import { HeaderStyles as styled } from './styles'
import { Avatar,Drawer } from '@/components';
import { useCallback, useMemo } from 'react'
import Logo from "./logo";
import { useAuth } from "@/usehooks/useAuth";
import { desensitizationPrincipal } from '@/utils/formate'
import { Principal } from "@dfinity/agent";
import { SearchInput } from '@/components';
import Icon from '@/icons/Icon'

interface Props {
    Id: string
};

const ListString = ['New Drops', "Explore", "Activity"]
export const Header = () => {
    const { plugLogIn, isAuth, principal, logOut }: { plugLogIn: Function, isAuth: boolean, principal: Principal, logOut: Function } = useAuth();
    const handleClick = () => {
        // @ts-ignore
        plugLogIn && plugLogIn()
    }
    const sc: string = useMemo(() => {
        return desensitizationPrincipal(String(principal));
    }, [String(principal)]);

    return (
        <styled.Header>
            <Icon name='logo' />
            <styled.SearchWrap>
                <SearchInput placeholder='Search by collection, items, artists, etc' />
            </styled.SearchWrap>
            <styled.RowWrap>
                {ListString.map((item: string) => (
                    <styled.RowListItem>
                        {item}
                    </styled.RowListItem>
                ))}
            </styled.RowWrap>
            <Icon name="darkmode" />
            <Icon name='wallet' />
            <Drawer />
        </styled.Header>
    )
}
