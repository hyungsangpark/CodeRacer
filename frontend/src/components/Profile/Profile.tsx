import React from "react";
import { Avatar, IconButton, styled, Typography } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import styles from "./Profile.module.css";

const Name = styled(Typography)({
  fontWeight: 700,
  fontSize: "32px",
  textAlign: "left",
  marginRight: "10px",
});

const ProfileImage = styled(Avatar)({
  width: "100%",
  height: "auto",
  margin: "0 20px",
  marginBottom: 20,
});

type Props = {
  profile: {
    name: string;
    avatar: string;
  };
  onEditName: () => void;
};

function Profile({ profile, onEditName }: Props) {
  return (
    <div className={styles.MainContainer}>
      <ProfileImage
        alt={`Profile image of ${profile.name}`}
        src={profile.avatar}
      />
      <div className={styles.NameContainer}>
        <Name>{profile.name ?? "Unnamed Player"}</Name>
        <IconButton
          onClick={onEditName}
          sx={{
            fontSize: "32px",
            marginTop: "4px",
          }}
        >
          <CreateOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Profile;
