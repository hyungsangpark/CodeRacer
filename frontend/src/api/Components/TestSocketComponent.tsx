import React, {useEffect} from 'react';
import {SocketContext} from "../sockers/Sockets";

export default function TestSocketComponent() {
    const [message, setMessage] = React.useState('');
    const [data, setData] = React.useState('');

    const socketContext = React.useContext(SocketContext);

    useEffect(() => {
        socketContext.connected && socketContext.onAnotherExampleEvent((data:any) => {
            setData(data);
        });
    }, [socketContext.connected]);

    return (
        <div style={{width: "200px", height: "200px"}}>
            <h1>Test Socket Component</h1>
            <h3>{socketContext.connected}</h3>
            <button onClick={() => socketContext.connect()}>Connect</button>
            <button onClick={() => socketContext.emitExampleEvent("test")}>Emit Example Event</button>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={() => socketContext.emitAnotherExampleEvent(message)}>Emit Another Example Event</button>
            <span>{data}</span>
            <button onClick={() => socketContext.disconnect()}>Disconnect</button>
            <div></div>
        </div>
    );
}