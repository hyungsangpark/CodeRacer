import React, {useEffect} from "react";
import LoginContainer from "../../components/LoginContainer";
import ProfileContainer from "../../components/ProfileContainer";
import {useAuth0} from "@auth0/auth0-react";
import {getUser} from "../../api/Api";
import {UserProfile} from "../../utils/Types/ApiTypes";
import {CircularProgress} from "@mui/material";

function ProfilePage() {
  const {getAccessTokenSilently} = useAuth0();
  const {isLoading, isAuthenticated} = useAuth0();

  const [profile, setProfile] = React.useState<UserProfile | null>(null);

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      getUser(token).then(user => {
        console.log(user.data);
        setProfile(user.data);
      });
    });
  }, [isAuthenticated])

  return (
    <div style={{ margin: "0 5%", marginTop: "50px" }}>
      {isLoading || !profile ? <CircularProgress/> : isAuthenticated ? <ProfileContainer profile={profile}/> : <LoginContainer />}
    </div>
  );
}

export default ProfilePage;
