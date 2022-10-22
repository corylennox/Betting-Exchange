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
    >
        { children }
    </Auth0Provider>
    );
}
