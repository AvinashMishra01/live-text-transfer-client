import { ChangeEvent, useEffect, useState } from "react";
import socket from "./helper/socket";

const App = () => {
  const [userText, setUserText] = useState("");
  // function to handle the change
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setUserText(text);
    socket.emit("getText", text);
  };

  useEffect(() => {
    const handleIncomingText = (text: string) => {
      setUserText(text);
    };
    socket.on("newText", handleIncomingText);
    return () => {
      socket.off("newText", handleIncomingText);
    };
  }, []);
  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <section className="m-10 shadow-md rounded-md w-[90%] h-[90%] p-10 flex flex-col gap-5 items-center">
        <h1 className="text-4xl font-bold">Live Text Transfer</h1>
        <div className="flex flex-col gap-5 self-start h-full w-full">
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
      </section>
    </main>
  );
};

export default App;
