import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Connect from './components/Connect';

export const routes = (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/connect' component={Connect} />
    </Layout>
);
