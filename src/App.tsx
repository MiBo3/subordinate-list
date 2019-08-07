import React from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import { Search } from './components/Search';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const App = () => {
    const history = createBrowserHistory();

    return (
        <React.Fragment>
            <Router history={history}>
                <Switch>
                    <Route path={`/overview/:name`} component={EmployeeList}/>
                    <Route path={`/search`} component={Search}/>
                    <Redirect path="/" to="/search"/>
                </Switch>
            </Router>
        </React.Fragment>
    )
};

export default App;
