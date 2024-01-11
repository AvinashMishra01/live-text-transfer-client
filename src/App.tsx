import { useEffect, useState } from "react";
import socket from "./helper/socket";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [roomID, setRoomID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const roomCreated = (roomID: string) => {
      toast.success("Room created successfully");
      navigate(`/${roomID}`);
    };
    const joinedRoom = (roomID: string) => {
      toast.success("Room joined successfully");
      navigate(`/${roomID}`);
    };
    const handleInvalidRoomID = (message: string) => {
      toast.error(message);
    };

    socket.on("roomCreated", roomCreated);
    socket.on("joinedRoom", joinedRoom);
    socket.on("invalidRoom", handleInvalidRoomID);

    return () => {
      socket.off("roomCreated", roomCreated);
      socket.off("joinedRoom", joinedRoom);
      socket.off("invalidRoom", handleInvalidRoomID);
    };
  }, [navigate]);

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <section className="m-10 shadow-md rounded-md p-10 flex flex-col gap-5 items-center">
        <h1 className="text-2xl font-bold">Live Text Transfer</h1>

        {/* for creating and joining a room */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out px-4 py-2 rounded-md text-white font-bold"
            onClick={() => socket.emit("createRoom")}
          >
            Create room
          </button>
          <div className="flex items-center gap-2">
            <input
              className="p-2 border-[1px] border-gray-200 rounded-md "
              type="text"
              placeholder="Enter the room code"
              value={roomID}
              onChange={(event) => setRoomID(event.target.value)}
            />
            <button
              className=" bg-gray-500 hover:bg-gray-600 transition-all duration-300 ease-in-out px-4 py-2 rounded-md text-white font-bold"
              disabled={roomID.length !== 6 ? true : false}
              onClick={() => socket.emit("joinRoom", roomID)}
            >
              Join room
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
