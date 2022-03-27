import Logger from "../util/Logger";
import {Server, Socket} from "socket.io";

function exampleEvent(socket: Socket, io: Server) {
    socket.on('exampleEvent', (data: any) => {
        Logger.info(`exampleEvent ${data}`);
    });
}

function anotherExampleEvent(socket: Socket, io: Server) {
    socket.on('anotherExampleEvent', (data: any) => {
        Logger.info(`anotherExampleEvent ${data}`);
    });
}

export default function(socket: Socket, io: Server) {
    exampleEvent(socket, io);
    anotherExampleEvent(socket, io);
}