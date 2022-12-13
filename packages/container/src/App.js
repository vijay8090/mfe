import React, {Suspense, lazy, useState} from "react";
import Header from "./components/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import Progress from "./components/Progress";


const MarketingLazy = lazy(() =>
    import('./components/MarketingApp')
);
const AuthLazy = lazy(() =>
    import('./components/AuthApp')
);
const generateClassName = createGenerateClassName({
    productionPrefix: 'cont-',
})
const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

   const signInCallback = ()=> {
        console.log('signed in..');
        setIsSignedIn(true);
   };

    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <div>
                    <Header onSignOut={()=> setIsSignedIn(false)} isSignedIn={isSignedIn}/>
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn = {signInCallback} />
                            </Route>

                            <Route path="/" component={MarketingLazy}/>
                        </Switch>
                    </Suspense>
                </div>
            </BrowserRouter>
        </StylesProvider>
    )
}
export default App;
