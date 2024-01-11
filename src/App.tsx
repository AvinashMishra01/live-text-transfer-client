import { useState } from "react";

const App = () => {
  const [userText, setUserText] = useState("");
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
            onChange={(event) => setUserText(event.target.value)}
          />
        </div>
      </section>
    </main>
  );
};

export default App;
