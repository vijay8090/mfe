import React, {Suspense, lazy, useState, useEffect} from "react";
import Header from "./components/Header";
import {Router, Redirect, Route, Switch} from "react-router-dom";
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import Progress from "./components/Progress";
import {createBrowserHistory} from 'history';

const MarketingLazy = lazy(() =>
    import('./components/MarketingApp')
);
const AuthLazy = lazy(() =>
    import('./components/AuthApp')
);
const DashboardLazy = lazy(() => import('./components/DashboardApp'));
const generateClassName = createGenerateClassName({
    productionPrefix: 'cont-',
})

const history = createBrowserHistory();


const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    const signInCallback = () => {
        console.log('signed in..');
        setIsSignedIn(true);
    };
    return (
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <div>
                    <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={signInCallback}/>
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" />}
                                <DashboardLazy />
                            </Route>
                            <Route path="/" component={MarketingLazy}/>
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        </StylesProvider>
    )
}
export default App;
