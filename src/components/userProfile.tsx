import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import UserInput from "./userInput";

const UserProfile = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) {
    return (
      <div>
        <h3>User:</h3>
        <h3>{user?.name}</h3>
        <h4>{user?.email}</h4>
        <UserInput />
      </div>
    );
  }

  return null;
};

export default UserProfile;
