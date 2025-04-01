import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const Homepage = () => {
    const [roomId, setRoomId] = useState('')
    const [username, setusername] = useState('')
    const navigate = useNavigate();
    function RoomId(e) {
        e.preventDefault()
        const id = uuidV4()
        setRoomId(id)
        console.log(id)
        toast.success("New room created")
    }
    function JoinRoom() {
        if (!roomId || !username) {
            toast.error("Room ID required and username required")
            return
        }
        navigate(`/editor/${roomId} `, {
            state: {
                username,
                roomId,
            },
        })

    }
    const InputKeyHandler = (e) => {
        if (e.code === "Enter") {
            console.log("Button clicked")
            JoinRoom()
        }
    }
    return (
        <div className="bg-blue-900 h-screen flex justify-center items-center text-white">
            <div className="rounded-md shadow-lg  flex bg-slate-900  justify-center items-center flex-col  ">
                <div className="bg-slate-400 rounded-md flex m-7 text-white justify-center items-center">
                    <img className="w-72" src="../src/assets/share-code.png" alt="" />
                </div>
                <h1 className="font-medium text-md">Paste Room Id</h1>
                <div className="flex justify-center p-4 items-center flex-col ">

                    <input
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="bg-slate-100 h-10 w-84 rounded-md text-center text-black"
                        type="text"
                        placeholder="Room ID"
                        // onKeyUp={InputKeyHandler}
                    />

                    <input
                        value={username}
                        onKeyUp={InputKeyHandler}
                        onChange={(e) => setusername(e.target.value)}
                        type="text"
                        placeholder="User Name"
                        className="bg-slate-100 h-10 w-84 rounded-md text-center text-black m-3"
                    />

                    <button className="mb-4 bg-blue-900 h-10 w-20 rounded-md" onClick={JoinRoom}>Join</button>
                    <span>If u dont have an invite create one <a href="" onClick={RoomId} className="text-slate-400 underline">New invite</a></span>
                </div>
            </div>
            {/* <div className="flex self-baseline ">
                <h1>Made with love by <a className="text-slate-400 underline" href="https://github.com/Ayaan-Skh" target="_blank">Ayaan</a></h1>
            </div> */}
        </div>
    )
}