import { ChangeEvent, useEffect, useState } from "react";
import socket from "../helper/socket";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const TextArea = () => {
  const navigate = useNavigate();
  const [userText, setUserText] = useState("");
  const { id: roomID } = useParams();

  // function to copy roomid
  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomID || "");
    toast.success("Room ID copied successfully");
  };

  // function to handle the change and send data to socket
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;

    setUserText(text);
    socket.emit("getText", { userText: text, roomID });
  };

  // to receive text from socket
  useEffect(() => {
    //   check room is valid or not
    socket.emit("checkValidRoom", roomID);

    // other function handlers
    const handleIncomingText = (text: string) => {
      setUserText(text);
    };
    const handleRoomLeft = (data: { success: boolean; message: string }) => {
      toast.success(data?.message);
      navigate("/");
    };
    const handleInvalidRoom = (message: string) => {
      toast.error(message);
      navigate("/");
    };

    socket.on("newText", handleIncomingText);
    socket.on("roomLeft", handleRoomLeft);
    socket.on("invalidRoom", handleInvalidRoom);
    return () => {
      socket.off("newText", handleIncomingText);
      socket.off("roomLeft", handleRoomLeft);
      socket.off("invalidRoom", handleInvalidRoom);
    };
  }, [navigate, roomID]);
  return (
    <section className="p-10 h-screen w-screen">
      <div className="flex flex-col gap-5 self-start h-full w-full rounded-md shadow-md p-5">
        {/* for room details */}
        <div className="self-center flex items-center gap-5">
          <p className="p-2 border-[1px] border-gray-200 rounded-md font-semibold min-w-60 text-center">
            {roomID}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out px-4 py-2 rounded-md text-white font-bold"
            onClick={copyToClipboard}
          >
            Copy Room ID
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 transition-all duration-300 ease-in-out px-4 py-2 rounded-md text-white font-bold"
            onClick={() => socket.emit("leaveRoom", roomID)}
          >
            Leave room
          </button>
        </div>
        {/* for text area */}
        <div className="flex flex-col self-start h-full w-full gap-5">
          <label className="text-2xl font-bold">
            Enter your text to transfer
          </label>
          <textarea
            className="w-full h-full resize-none p-2 border-[1px] border-gray-200 rounded-md"
            placeholder="type your text here"
            value={userText}
            onChange={(event) => handleTextChange(event)}
          />
        </div>
      </div>
    </section>
  );
};

export default TextArea;
