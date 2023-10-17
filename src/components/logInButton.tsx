import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogInButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div>
      <button
        className="logInBtn"
        disabled={isAuthenticated}
        onClick={() => loginWithRedirect()}
      >
        Log in
      </button>
    </div>
  );
};

export default LogInButton;
