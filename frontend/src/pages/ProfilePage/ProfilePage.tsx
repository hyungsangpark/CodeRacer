import React from "react";
import LoginContainer from "../../components/LoginContainer";
import ProfileContainer from "../../components/ProfileContainer";

function ProfilePage() {
  // Replace the following two lines with context values.
  const isLoggedIn = true;
  // const isLoggedIn = false;

  return (
    <div style={{ margin: "0 5%", marginTop: "50px" }}>
      {isLoggedIn ? <ProfileContainer /> : <LoginContainer />}
    </div>
  );
}

export default ProfilePage;
