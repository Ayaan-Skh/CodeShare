import { io } from "socket.io-client";


export async function initSocket(){
    console.log("connection reached")
    const options={
        'force all connections':true,
        reconnectivityEvents:Infinity,
        timeout:10000,
        transports:['websocket']
    }
    return io('http://localhost:3000',options)
}