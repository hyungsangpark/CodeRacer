import { styled } from "@mui/material";
import React from "react";
import { Player } from "../../utils/Types/GameTypes";
import Profile from "../Profile";
import ProfileMatchHistory from "../ProfileMatchHistory";
import ProfileStats from "../ProfileStats";
import styles from "./ProfileContainer.module.css";
import {Avatar, UserProfile} from "../../utils/Types/ApiTypes";

const Spacer = styled("div")({
  height: 60,
});

interface Props {
  profile: UserProfile;
  imagesArray: Avatar[];
  setProfileImage: (id: string) => void;
}

function ProfileContainer({ profile, imagesArray, setProfileImage }: Props) {
  return (
    <div className={styles.MainContainer}>
      <div className={styles.LeftContainer}>
        <Profile setProfileImage={setProfileImage} imagesArray={imagesArray} profile={profile} />
      </div>
      <div className={styles.RightContainer}>
        <ProfileStats
          averageCPM={profile.avgStats.avgCPM}
          averageAccuracy={profile.avgStats.avgAccuracy}
          averageErrors={profile.avgStats.avgErrors}
          victories={profile.avgStats.victories}
        />
        <Spacer />
        <ProfileMatchHistory matches={profile.matchHistory} />
      </div>
    </div>
  );
}

export default ProfileContainer;
