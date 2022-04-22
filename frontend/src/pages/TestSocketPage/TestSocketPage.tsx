import React, {useEffect} from 'react';
import CustomButton from "../../components/Buttons";
import {Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import CustomInput from "../../components/Input";
import {SocketContext} from "../../api/sockers/Sockets";

const TempTypography = styled(Typography)(({theme}) => ({
  marginBottom: "3%",
  marginTop: "3%",
}));

function TestSocketPage() {
  const socketContext = React.useContext(SocketContext);

  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    if (!socketContext!!.connected) return;

    socketContext!.onCreateLobby((data) => {
      console.log(data);
    });

    socketContext!.onJoinLobby((data) => {
      console.log(data);
    });
  }, [socketContext!.connected]);

  const connect = () => {
    if (socketContext!!.connected) {
      socketContext!.disconnect();
    }
    else {
      socketContext!.connect();
    }
  }

  const tempTestPlayerName = Math.floor(Math.random() * 1000).toString();

  const createLobby = () => {
    socketContext!.createLobby({playerName: tempTestPlayerName});
  }

  const joinLobby = () => {
    socketContext!.joinLobby({playerName: tempTestPlayerName, lobbyID: inputValue});
  }

  const leaveLobby = () => {
    socketContext!.leaveLobby();
  }

  const onInputChange = (input: string) => {
    setInputValue(input);
  }

  console.log(socketContext!.connected);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}>
      <TempTypography variant="h3">Test Socket Screen</TempTypography>
      <CustomButton onClick={connect} size="large" selected={socketContext!.connected}>{socketContext!.connected ? "Disconnect" : "Connect"}</CustomButton>
      <TempTypography>Currently open room codes</TempTypography>
      <CustomInput onChange={(input) => onInputChange(input)}/>
      <CustomButton style={{marginTop: "2%"}} onClick={createLobby}>Create Lobby</CustomButton>
      <CustomButton style={{marginTop: "2%"}} onClick={joinLobby}>Join Lobby</CustomButton>
      <CustomButton style={{marginTop: "2%"}} onClick={leaveLobby}>Leave Lobby</CustomButton>
      <TempTypography>Current sockets in room</TempTypography>
    </div>
  );
}

export default TestSocketPage;