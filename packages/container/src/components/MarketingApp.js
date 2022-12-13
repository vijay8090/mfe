import React, {useEffect, useRef} from "react";
import {mount as marketingMount} from 'marketing/MarketingApp';
import {useHistory} from "react-router-dom";

const MarketingApp = () => {
    const ref = useRef(null);
    const history = useHistory();
    useEffect(() => {
        const {onParentNavigate} = marketingMount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({pathname: nextPathname}) => {
                console.log("container watched a navigation from marketing app");
                console.log(nextPathname);
                const {pathname} = history.location;
                if ((pathname !== nextPathname)) {
                    history.push(nextPathname);
                }
            }
        });
        if (onParentNavigate) {
            history.listen(onParentNavigate);
        }
    }, [])
    return <div ref={ref}></div>
}
export default MarketingApp;
