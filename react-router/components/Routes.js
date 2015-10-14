import React from 'react';
import { Route } from 'react-router';
import Application from './Application';
import Home from './Home';
import About from './About';

const routes = (
    <Route component={Application}>
        <Route path="about" component={About}/>
        <Route path="/" component={Home}/>
    </Route>
);

export default routes;
