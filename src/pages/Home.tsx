import LogInButton from "../components/logInButton";
import LogOutButton from "../components/logOutButton";
import UserProfile from "../components/userProfile";

const Home = () => {
  return (
    <div>
      <LogInButton />
      <LogOutButton />
      <p>User info:</p>
      <UserProfile />
    </div>
  );
};

export default Home;
