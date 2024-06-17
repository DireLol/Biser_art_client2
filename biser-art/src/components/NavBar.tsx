import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { ABOUTUS_ROUTE, ADMIN_ROUTE, CART_ROUTE, GALLERY_ROUTE, LOGIN_ROUTE, MAINPAGE_ROUTE, REGISTRATION_ROUTE, SERVICE_ROUTE, SHOP_ROUTE } from '../utils/consts';
import basket from '../images/basket.svg';
import logo from '../images/BiserArt.svg';
import styled from 'styled-components';
import x from '../images/cross-svgrepo-com.svg';
import searchIcon from '../images/search.svg';

const Logo = styled.img`
    width: 191px;
    height: 67px;
    left: 95px;
`;

const Navigation = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1em;
    left: 0;
    width: 100%;
    font-family: 'Alegreya Sans', sans-serif;
`;

const AllContent = styled.div`
    & > ${Navigation} {
        background: white;
        z-index: 10;
        top: 0;
    }
`;

const LeftNav = styled.div`
    margin-left: 23em;
`;

const HeaderLink = styled.li`
    margin-left: 2.2em;
    &:hover, &:active {
        opacity: 65%;
    }
    &:focus {
        color: #E6C89C;
    }
`;

const SearchAndBusket = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const Search = styled.input`
    margin-right: 4em;
    background: url(${searchIcon}) no-repeat left 10px center;
    background-size: 20px;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 10px;
    width: 20em;
    height: 2.5em;
    padding-left: 43px;
    ::-webkit-search-cancel-button {
        -webkit-appearance: none;
        cursor: pointer;
        height: 20px;
        width: 20px;
        background-image: url(${x});
    }
`;

const Menu = styled.div`
    & > nav > ul {
        text-decoration: none;
        display: flex;
        flex-direction: row;
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.2em;
`;

const SignInSignUp = styled.div`
    color: rgb(0, 0, 0);
    font-family: Source Serif 4;
    font-size: 15px;
    margin-left: 2.7em;
    & > div {
        list-style-type: none;
        display: flex;
        flex-direction: row;
    }
`;

const Busket = styled.img`
    display: flex;
    align-self: flex-end;
    width: 46px;
    height: 49px;
`;

const NavUnlisted = styled.ul`
    a {
        text-decoration: none;
    }
    li {
        text-decoration: none;
        display: flex;
        flex-direction: row;
        color: black;
        list-style: none;
    }
    .opacity {
        li {
            color: gray;
        }
    }
`;

interface Link {
    id: number;
    name: string;
    path: string;
}

interface AuthLinksProps {
    rolePermissionId: number;
    authStore: any;
}

const links: Link[] = [
    { id: 1, name: "Главная", path: MAINPAGE_ROUTE },
    { id: 2, name: "Каталог", path: SHOP_ROUTE },
    { id: 3, name: "О нас", path: ABOUTUS_ROUTE },
    { id: 4, name: "Услуги", path: SERVICE_ROUTE },
    { id: 5, name: "Галерея", path: GALLERY_ROUTE }
];

const AuthLinks: FC<AuthLinksProps> = ({ rolePermissionId, authStore }) => (
    <div>
        {rolePermissionId === 1 && (
            <>
                <NavUnlisted>
                    <NavLink className="opacity" to={MAINPAGE_ROUTE} onClick={authStore.logout}><li>Выйти</li></NavLink>
                </NavUnlisted>
                <NavUnlisted>
                    <NavLink className="opacity" to={ADMIN_ROUTE}><li>Панель управления</li></NavLink>
                </NavUnlisted>
            </>
        )}
        {rolePermissionId === 2 && (
            <>
                <NavUnlisted>
                    <li>{`${authStore.user.email}`}</li>
                </NavUnlisted>
                <NavUnlisted>
                    <NavLink to={MAINPAGE_ROUTE} className="opacity" onClick={authStore.logout}><li>Выйти</li></NavLink>
                </NavUnlisted>
            </>
        )}
    </div>
);

const NonAuthLinks: FC = () => (
    <div>
        <NavUnlisted>
            <NavLink className="opacity" to={LOGIN_ROUTE}><li>Войти</li></NavLink>
        </NavUnlisted>
        <NavUnlisted>
            <NavLink className="opacity" to={REGISTRATION_ROUTE}><li>Регистрация</li></NavLink>
        </NavUnlisted>
    </div>
);

const NavBar: FC = observer(() => {
    const { authStore, productStore } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState('');
    const rolePermissionId: number = JSON.parse(localStorage.getItem('userPermission') || '0');
    const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            productStore.setSearchQuery(searchQuery);
            navigate(SHOP_ROUTE);
        }
    };

    return (
        <AllContent>
            
            <Navigation>
                <LeftNav>
                    <SignInSignUp>
                        {authStore.isAuth ? <AuthLinks rolePermissionId={rolePermissionId} authStore={authStore} /> : <NonAuthLinks />}
                    </SignInSignUp>
                    <form onSubmit={handleSearchSubmit}>
                        <SearchAndBusket>
                            <Search
                                name='search'
                                placeholder='Поиск'
                                type="search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <NavLink to={CART_ROUTE}><Busket src={basket} alt='Корзина' /></NavLink>
                        </SearchAndBusket>
                    </form>
                </LeftNav>
                <Menu>
                    <NavLink to={MAINPAGE_ROUTE}><Logo src={logo} alt='BiserArt' /></NavLink>
                    <nav>
                        <NavUnlisted>
                            {links.map(link => (
                                <HeaderLink key={link.id}>
                                    <NavLink to={link.path} className="current">
                                        <li>{link.name}</li>
                                    </NavLink>
                                </HeaderLink>
                            ))}
                        </NavUnlisted>
                    </nav>
                </Menu>
            </Navigation>
        </AllContent>
    );
});

export default NavBar;