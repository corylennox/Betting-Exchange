import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./history";

export default function Auth0Wrapper({ children }) {
    return (
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_CLIENT_ID}
        redirectUri={window.location.origin}
        audience={process.env.REACT_APP_AUDIENCE}
        scope="read:current_user update:current_user_metadata"
        useRefreshTokens={true}
        cacheLocation="memory"
    >
        {/* useRefreshTokens={true} persists user login throughout refreshes */}
        {/* cacheLocation="memory" persists user login throughout browser restarts. localStorage could work but should not be used: https://community.auth0.com/t/is-auth0-spa-js-storing-tokens-in-localstorage-vulnerable-to-xss/77145/5 */}
        { children }
    </Auth0Provider>
    );
}
