import { styled, Typography } from "@mui/material";
import React from "react";
import PlayerCard from "../Player";
import PlayerCardStats from "../PlayerCardStats";

const Header = styled(Typography)({
  fontSize: "32px",
  fontWeight: 700,
  marginBottom: "10px",
});

type Match = {
  players: {
    name: string;
    avatar: string;
  }[];
  cpm: number;
  accuracy: number;
  errors: number;
};

type Props = {
  matches: Match[];
};

function ProfileMatchHistory({ matches }: Props) {
  return (
    <>
      <Header>Match History</Header>
      {matches.map((match) => (
        <PlayerCard
          playerName={`${match.players[0].name}${
            match.players.length > 1 ? " and more" : ""
          }`}
          playerAvatar={match.players[0].avatar ?? ""}
          rightChild={
            <PlayerCardStats
              CPM={match.cpm}
              Accuracy={match.accuracy}
              Errors={match.errors}
            />
          }
          style={{ margin: "10px 0" }}
        />
      ))}
    </>
  );
}

export default ProfileMatchHistory;
