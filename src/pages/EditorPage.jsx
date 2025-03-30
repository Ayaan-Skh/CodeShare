import React, { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import {useLocation} from 'react-router-dom'

import CodeEditor from "../components/CodeEditor";
import { initSocket } from "../socket";
import { ACTIONS } from "../components/Action";

export const Editor = () => {
    const socketRef=useRef(null);
    const location=useLocation();
    useEffect(()=>{
        const init=async ()=>{
            socketRef.current=await initSocket();
            socketRef.current.emit(ACTIONS.JOIN,{
                roomId,
                username:location.state?.username,
            })
        }
        init()
    },[])
    const [clients, setClient] = useState([
        { socketId: 1, username: "Ayaan Shaikh" },
        { socketId: 2, username: "Ayaan Shaikh" },
        { socketId: 3, username: "Ayaan Shaikh" },

        { socketId: 4, username: "Haris Shaikh" }
    ])
    return (
        <>
            <div className="flex flex-row bg-blue-900 w-screen h-screen">
                <div>
                    <div className="bg-slate-900 flex flex-col justify-between w-[15vw] h-screen">
                        <div>
                            <div className="flex flex-col items-center ">
                                <img className="w-36 bg-slate-400 rounded-lg mt-4" src="https://png.pngtree.com/png-vector/20240805/ourmid/pngtree-freelancer-software-developer-programmer-coder-illustrator-png-image_13076689.png" alt="" />
                                <h2 className="text-white font-semibold text-xl">Connected</h2>
                            </div>
                            <div className="h-82 overflow-y-auto w-[13vw] flex  justify-center pl-3 flex-wrap">

                                <div className="flex flex-wrap flex-row mt-4 ">
                                    {clients.map((client) => (<Client key={client.socketId} username={client.username} />))}
                                </div>
                            </div>
                        </div>
                        <div className="flex m-5 flex-col text-white">
                            <button className="rounded-lg m-1 text-lg font-semibold bg-blue-900 h-14 cursor-pointer">Copy Room code</button>
                            <button className="rounded-lg m-1 text-lg bg-slate-400 font-semibold cursor-pointer h-14">Leave Room</button>
                        </div>
                    </div>
                </div>
                    <div><CodeEditor/></div>
            </div>
        </>
    )
}