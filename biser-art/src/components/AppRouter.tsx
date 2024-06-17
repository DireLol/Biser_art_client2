import React, { FC, useContext } from 'react';
import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import { Context } from '../index';
import { authRoutes, publicRoutes } from '../routes';
import { MAINPAGE_ROUTE } from '../utils/consts';

const AppRouter: FC = () => {
    const { authStore } = useContext(Context);
    console.log(authStore.isAuth, authStore.user);
    return (
        <Switch>
            {authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} Component={Component } /> 
            )}

            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} Component={Component} /> 
            )}

            <Route path={MAINPAGE_ROUTE} element={<Navigate to={MAINPAGE_ROUTE} replace />} /> 
        </Switch>
    );
};

export default AppRouter;