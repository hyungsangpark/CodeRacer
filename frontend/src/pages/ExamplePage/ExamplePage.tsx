import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { SocketContext } from "../../api/sockers/Sockets";

function ExamplePage() {
  const [message, setMessage] = React.useState("");
  const [data, setData] = React.useState("");

  const socketContext = React.useContext(SocketContext);

  useEffect(() => {
    socketContext.connected &&
      socketContext.onAnotherExampleEvent((data: any) => {
        setData(data);
      });
  }, [socketContext.connected]);

  return (
    <Container
      maxWidth="md"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h3">Test Socket Component</Typography>
      <Typography variant="h4">Connected: {socketContext.connected}</Typography>
      <Button
        variant="contained"
        sx={{
          marginTop: "1rem",
          marginBottom: "1rem",
          width: "100%",
        }}
        onClick={() => socketContext.connect()}
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
        onClick={() => socketContext.emitAnotherExampleEvent(message)}
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
        onClick={() => socketContext.disconnect()}
      >
        Disconnect
      </Button>
    </Container>
  );
}

export default ExamplePage;
