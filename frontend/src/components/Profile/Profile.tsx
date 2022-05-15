import React from "react";
import {
  Avatar,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  Popover,
  styled,
  Typography,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
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

const VerticalImageList = styled(ImageList)({
  width: "500px",
  margin: "5px 0px",
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(auto-fit, 1fr) !important",
  gridAutoColumns: "1fr",
});

const ChangeProfileImageButton = styled(IconButton)({
  position: "absolute",
  bottom: "10%",
  right: "10%",
  color: "white",
  backgroundColor: "#1f1f1f",
  "&:hover": {
    backgroundColor: "#1f1f1fdd",
  },
});

type Props = {
  profile: {
    username: string;
    profilePicture: string;
  };
  onEditName: () => void;
};

// Temporary images array until it's implemented in the backend
const imagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({
  src: "https://picsum.photos/500?random=" + i,
}));

function Profile({ profile, onEditName }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={styles.MainContainer}>
      <div className={styles.ProfileImageContainer}>
        <ProfileImage
          alt={`Profile image of ${profile.username}`}
          src={profile.profilePicture}
        />
        <ChangeProfileImageButton onClick={handleClick}>
          <AccountBoxIcon fontSize="large" />
        </ChangeProfileImageButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className={styles.PopoverContainer}>
            <Typography
              variant="h6"
              sx={{ marginLeft: "10px", fontWeight: 400 }}
            >
              Please select your new profile image.
            </Typography>
            <VerticalImageList>
              {imagesArray.map(({ src }, index) => (
                <ImageListItem key={src}>
                  <Button
                    onClick={() => {
                      // Change this to a genuine logic when backend is implemented.
                      // For now, this will just print out an alert.
                      console.log("Picture clicked", src);

                      // Close the popover
                      handleClose();
                    }}
                  >
                    <img
                      key={`profileImage${index}`}
                      src={src}
                      alt={`Profile image ${index}`}
                      height="80"
                      loading="lazy"
                    />
                  </Button>
                </ImageListItem>
              ))}
            </VerticalImageList>
          </div>
        </Popover>
      </div>
      <div className={styles.NameContainer}>
        <Name>{profile.username ?? "Unnamed Player"}</Name>
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
