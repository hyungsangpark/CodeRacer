import {Button, Container, TextField, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {SocketContext} from "../../api/sockers/Sockets";
import ProgressBar from "../../components/ProgressBar";
import CustomButton from "../../components/Buttons";
import CustomInput from "../../components/Input";
import PlayerCard from "../../components/Player";
import ScoreDisplayItem from "../../components/ScoreDisplay";
import SettingSelector from "../../components/SettingSelector";
import CodeInput from "../../components/CodeInput";
import WelcomeCode from "../../components/WelcomeCode";

function ExamplePage() {
  const [message, setMessage] = React.useState("");
  const [data, setData] = React.useState("");

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const socketContext = React.useContext(SocketContext);

  useEffect(() => {
    socketContext!.connected &&
    socketContext!.onAnotherExampleEvent((data: any) => {
      setData(data);
    });
  }, [socketContext!.connected]);

  return (
    <Container
      maxWidth="md"
      style={{display: "flex", flexDirection: "column"}}
    >
      <Typography variant="h3">Test Socket Component</Typography>
      <Typography variant="h4">Connected: {socketContext!.connected.toString()}</Typography>
      <Button
        variant="contained"
        sx={{
          marginTop: "1rem",
          marginBottom: "1rem",
          width: "100%",
        }}
        onClick={() => socketContext!.connect()}
      >
        Connect
      </Button>
      <TextField
        id="message-input"
        label="Message"
        multiline
        variant="filled"
        sx={{
          marginTop: "1rem",
          marginBottom: "1rem",
          width: "100%",
        }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="contained"
        sx={{
          marginTop: "1rem",
          marginBottom: "1rem",
          width: "100%",
        }}
        onClick={() => socketContext!.emitAnotherExampleEvent(message)}
      >
        Emit Another Example Event
      </Button>
      <Typography variant="h5">Data: {data}</Typography>
      <Button
        variant="contained"
        sx={{
          marginTop: "1rem",
          marginBottom: "1rem",
          width: "100%",
        }}
        onClick={() => socketContext!.disconnect()}
      >
        Disconnect
      </Button>

      <ProgressBar progress={50}/>

      <div style={{marginTop: "10px"}}>
        <CustomButton onClick={() => console.log("Test")}>Play Solo</CustomButton>
      </div>
      <div style={{marginTop: "10px"}}>
        <CustomInput onChange={(text: string) => {
          console.log(text)
        }}/>
      </div>

      <div style={{marginTop: "10px", width: "350px"}}>
        <PlayerCard
          playerAvatar="https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34" playerName="dlwlrma"
          rightChild={<Typography>Right Child</Typography>}/>
      </div>

      <div style={{marginTop: "10px"}}><ScoreDisplayItem score={99} label="Accuracy"/></div>

      <div style={{marginTop: "10px", width: "150px"}}>
        <SettingSelector
          options={["test1", "test2", "test3"]}
          selectedIndex={selectedIndex}
          onSelect={(option: number) => setSelectedIndex(option)}/>
      </div>

      <div style={{marginTop: "10px", marginBottom: "100px"}}>
        {/*<CodeInput checkKeyPressed={(correct) => console.log(correct)}/>*/}
      </div>
      <div>
        <WelcomeCode
          code={`def codeRacerGreeting():
    print(“Hello, World!”)
    print(“CodeRacer welcomes you.”)`} language="python"
        />
      </div>
    </Container>
  );
}

export default ExamplePage;
