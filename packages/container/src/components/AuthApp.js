import React, {useEffect, useRef} from "react";
import {mount} from 'auth/AuthApp';
import {useHistory} from "react-router-dom";

const AuthApp = ({onSignIn}) => {
    const ref = useRef(null);
    const history = useHistory();
    useEffect(() => {
        const {onParentNavigate} = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({pathname: nextPathname}) => {
                console.log("container watched a navigation from auth app");
                console.log(nextPathname);
                const {pathname} = history.location;
                if ((pathname !== nextPathname)) {
                    history.push(nextPathname);
                }
            },
            onSignIn,
        });
        if (onParentNavigate) {
            history.listen(onParentNavigate);
        }
    }, [])
    return <div ref={ref}></div>
}
export default AuthApp;
