import React, { useEffect } from "react";
import LoginContainer from "../../components/LoginContainer";
import ProfileContainer from "../../components/ProfileContainer";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllAvatars, getUser, setUserAvatar } from "../../api/Api";
import { Avatar, UserProfile } from "../../utils/Types/ApiTypes";
import { CircularProgress } from "@mui/material";
import PageContainer from "../../components/PageContainer";

function ProfilePage() {
  const { getAccessTokenSilently } = useAuth0();
  const { isLoading, isAuthenticated } = useAuth0();

  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [avatars, setAvatars] = React.useState<Avatar[]>([]);

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      getUser(token).then((user) => {
        console.log(user.data);
        setProfile(user.data);
      });
    });
  }, [isAuthenticated]);

  useEffect(() => {
    getAllAvatars().then((avatars) => {
      setAvatars(avatars.data.avatars);
    });
  }, []);

  const setProfileImage = (avatarId: string) => {
    getAccessTokenSilently().then((token) => {
      setUserAvatar(token, avatarId).then((res) => {
        if (profile === null) {
          return;
        }

        const newUserProfile: UserProfile = {
          ...profile,
          profilePicture: res.data,
        };

        setProfile(newUserProfile);
      });
    });
  };

  return (
    <PageContainer style={{ margin: "0 5%", width: "auto" }}>
      {isLoading || !profile ? (
        <CircularProgress />
      ) : isAuthenticated ? (
        <ProfileContainer
          imagesArray={avatars}
          setProfileImage={setProfileImage}
          profile={profile}
        />
      ) : (
        <LoginContainer />
      )}
    </PageContainer>
  );
}

export default ProfilePage;
