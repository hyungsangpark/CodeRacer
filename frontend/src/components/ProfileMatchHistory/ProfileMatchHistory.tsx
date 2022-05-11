import { styled, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Match } from "../../utils/Types/GameTypes";
import PlayerCard from "../Player";
import PlayerCardStats from "../PlayerCardStats";

const Header = styled(Typography)({
  fontSize: "32px",
  fontWeight: 700,
  marginBottom: "10px",
});

type Props = {
  matches: Match[];
};

function ProfileMatchHistory({ matches }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <Header>Match History</Header>
      {matches.map((match, index) => {
        const firstPlayer = match.players[0];
        return (
          <PlayerCard
            key={`match${index}`}
            playerName={`${firstPlayer.playerName}${
              match.players.length > 1 ? " and more" : ""
            }`}
            playerAvatar={firstPlayer.playerAvatar ?? ""}
            rightChild={
              <PlayerCardStats
                CPM={firstPlayer.playerStats.CPM}
                Accuracy={firstPlayer.playerStats.Accuracy}
                Errors={firstPlayer.playerStats.Errors}
              />
            }
            style={{ margin: "10px 0", width: "100%" }}
            onClick={() =>
              navigate(`/results`, { state: { ...match, toMain: false } })
            }
          />
        );
      })}
    </>
  );
}

export default ProfileMatchHistory;
