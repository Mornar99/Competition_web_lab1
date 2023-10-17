import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogOutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    <div>
      <button
        disabled={!isAuthenticated}
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log out
      </button>
    </div>
  );
};

export default LogOutButton;
