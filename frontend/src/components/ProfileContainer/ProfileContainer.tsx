import { styled } from "@mui/material";
import React from "react";
import Profile from "../Profile";
import ProfileMatchHistory from "../ProfileMatchHistory";
import ProfileStats from "../ProfileStats";
import styles from "./ProfileContainer.module.css";

const Spacer = styled("div")({
  height: 60,
});

function ProfileContainer() {
  const profile = {
    name: "John Doe",
    avatar:
      "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2019/05/15/c436a58e-73e5-11e9-b91a-87f62b76a5ee_image_hires_115320.jpg?itok=3c74LGuO&v=1557892405",

    averageCPM: 295,
    averageAccuracy: 85,
    averageErrors: 7,
    victories: 12,

    matches: [
      {
        players: [
          {
            name: "John Doe",
            avatar:
              "https://blog.kakaocdn.net/dn/sOFQo/btqFXIdG4BC/OSX6phlqjlj7p3EYH1jZjk/img.png",
          },
          {
            name: "Jane Doe",
            avatar:
              "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2019/05/15/c436a58e-73e5-11e9-b91a-87f62b76a5ee_image_hires_115320.jpg?itok=3c74LGuO&v=1557892405",
          },
        ],
        cpm: 324,
        accuracy: 95,
        errors: 8,
      },
      {
        players: [
          {
            name: "Harriot Truman",
            avatar: "https://picsum.photos/300",
          },
        ],
        cpm: 129,
        accuracy: 84,
        errors: 23,
      },
    ],
  };

  const onEditName = () => {
    // Implement later.
    alert("Edit name");
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.LeftContainer}>
        <Profile profile={profile} onEditName={onEditName} />
      </div>
      <div className={styles.RightContainer}>
        <ProfileStats
          averageCPM={profile.averageCPM}
          averageAccuracy={profile.averageAccuracy}
          averageErrors={profile.averageErrors}
          victories={profile.victories}
        />
        <Spacer />
        <ProfileMatchHistory matches={profile.matches} />
      </div>
    </div>
  );
}

export default ProfileContainer;
