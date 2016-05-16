import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../containers';
import { Login, UserDashboard, AdminDashboard } from '../views';
import { requireAuthentication, requireAdmin } from '../utils';

export default(
    <Route path='/' component={App}>
        <IndexRoute component={requireAuthentication(UserDashboard)}/>
        <Route path="login" component={Login}/>
        <Route path="admin" component={requireAuthentication(requireAdmin(AdminDashboard))}/>
    </Route>
);