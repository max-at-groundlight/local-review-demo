"use client"

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';

type Input = {
  cancel?: boolean;
  image: string;
  det_query: string;
  det_id: string;
  det_name: string;
  det_idx: number;
  imgsrc_idx: number;
  uuid: string;
}

export default function Home() {
  const [socketUrl, setSocketUrl] = useState('ws://localhost:8000/ws');
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [inputQueue, setInputQueue] = useState<Input[]>([]);

  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const { sendJsonMessage, lastJsonMessage: lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      // const json: { image: string } = JSON.parse(lastMessage.toString());
      const json: Input = lastMessage as any;
      if (json.cancel) {
        console.log("cancel");
        console.log(json);
        setInputQueue((prev) => prev.filter((val) => val.uuid != json.uuid));
        return;
      }
      if (!json.image) return;
      console.log("new image");
      console.log(json);
      setInputQueue((prev) => prev.concat(json));
    }
  }, [lastMessage, setMessageHistory]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "a") {
        const output = {
          ...inputQueue[0],
          label: "YES"
        };
        console.log("output yes");
        console.log(output);
        sendJsonMessage(output);
        setInputQueue((prev) => prev.slice(1));
      } else if (event.key === "s") {
        const output = {
          ...inputQueue[0],
          label: "NO"
        };
        console.log("output no");
        console.log(output);
        sendJsonMessage(output);
        setInputQueue((prev) => prev.slice(1));
      } else if (event.key === "f") {
        setInputQueue((prev) => prev.slice(1));
      }
    }

    document.addEventListener("keydown", (e) => {});

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    }
  }, []);

  return (
    <main className="flex flex-col min-h-screen w-full">
      <h1 className="text-4xl font-bold text-center">Local Review</h1>
      <div className="p-2"></div>
      {
        inputQueue.length > 0 && inputQueue[0].image != "" &&
        <div className="flex flex-col gap-2 place-items-center">
          <h2 className="text-2xl font-bold text-center">{inputQueue[0].det_query}</h2>
          <img src={`data:image/jpeg;base64,${inputQueue[0].image}`} alt="base64" className="w-1/2 rounded-xl" />
        </div>
      }
      <div className="p-1 m-auto"></div>
      <div className="w-full flex p-5 pt-1">
        <div className="p-1 m-auto"></div>
        <div className="px-12"></div>
        <button className="bg-blue-500 hover:bg-blue-700 font-bold text-white rounded-md px-4 py-2" onClick={() => {
          const output = {
            ...inputQueue[0],
            label: "YES"
          };
          console.log("output yes");
          console.log(output);
          sendJsonMessage(output);
          setInputQueue((prev) => prev.slice(1));
        }}>
          PASS
        </button>
        <div className="px-6"></div>
        <button className="bg-red-500 hover:bg-red-700 font-bold text-white rounded-md px-4 py-2" onClick={() => {
          const output = {
            ...inputQueue[0],
            label: "NO"
          };
          console.log("output no");
          console.log(output);
          sendJsonMessage(output);
          setInputQueue((prev) => prev.slice(1));
        }}>
          FAIL
        </button>
        <div className="p-1 m-auto"></div>
        <button className="border-2 border-blue-500 hover:border-blue-700 font-bold text-blue-500 hover:text-blue-700 hover:bg-blue-200 rounded-md px-4 py-2 flex place-items-center gap-2" onClick={() => {
          setInputQueue((prev) => prev.slice(1));
        }}>
          SKIP
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </main>
  )
}
