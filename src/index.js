import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    // domain={process.env.REACT_APP_DOMAIN}
    // clientId={process.env.REACT_APP_DOMAIN_CLIENT_ID}
    // authorizationParams={{ redirect_uri: window.location.origin }}
    domain={"dev-rnx2liu5ldvjdmls.us.auth0.com"}
    clientId={"Qa1pIteZhvD4HxwvdBuJ8nohNbHC4Dbv"}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);
