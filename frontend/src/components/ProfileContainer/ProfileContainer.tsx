import { styled } from "@mui/material";
import React from "react";
import { Player } from "../../utils/Types/GameTypes";
import Profile from "../Profile";
import ProfileMatchHistory from "../ProfileMatchHistory";
import ProfileStats from "../ProfileStats";
import styles from "./ProfileContainer.module.css";
import {UserProfile} from "../../utils/Types/ApiTypes";

const Spacer = styled("div")({
  height: 60,
});

// const dummyMatch: { players: Player[] }[] = [
//   {
//     players: [
//       {
//         playerName: "John Doe",
//         playerAvatar:
//           "https://blog.kakaocdn.net/dn/sOFQo/btqFXIdG4BC/OSX6phlqjlj7p3EYH1jZjk/img.png",
//         playerStats: {
//           CPM: 295,
//           Accuracy: 85,
//           Errors: 7,
//         },
//       },
//       {
//         playerName: "Jane Doe",
//         playerAvatar:
//           "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2019/05/15/c436a58e-73e5-11e9-b91a-87f62b76a5ee_image_hires_115320.jpg?itok=3c74LGuO&v=1557892405",
//         playerStats: {
//           CPM: 218,
//           Accuracy: 92,
//           Errors: 3,
//         },
//       },
//     ],
//   },
//   {
//     players: [
//       {
//         playerName: "Harriot Truman",
//         playerAvatar: "https://picsum.photos/300?random=1",
//         playerStats: {
//           CPM: 218,
//           Accuracy: 92,
//           Errors: 3,
//         },
//       },
//       {
//         playerName: "Franklin Roosevelt",
//         playerAvatar: "https://picsum.photos/300?random=2",
//         playerStats: {
//           CPM: 183,
//           Accuracy: 93,
//           Errors: 5,
//         },
//       },
//       {
//         playerName: "George Washington",
//         playerAvatar: "https://picsum.photos/300?random=3",
//         playerStats: {
//           CPM: 193,
//           Accuracy: 91,
//           Errors: 7,
//         },
//       },
//     ],
//   },
// ];

interface Props {
  profile: UserProfile;
}

function ProfileContainer({ profile }: Props) {
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
