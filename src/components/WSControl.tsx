import { useEffect } from "react";
import { useRecoilState } from 'recoil';
import { queueState } from './Queue'
import { WSState, onlineCounter } from "./Header";
import socket from "./WSConnector";

const WSControl = () => {
  const [, setQueue] = useRecoilState<any>(queueState);
  const [, setCounter] = useRecoilState(onlineCounter);
  const [, setWSConnectionState] = useRecoilState(WSState);

  useEffect(() => {
    socket.addEventListener("message", e => {
      const received = JSON.parse(e.data)[0];
      console.log("==========A new data received==========");
      console.log(received);
      switch (received["type"]) {
        case "add":
          const SSprevQueue: any = sessionStorage.getItem("prevQueue");
          const prevQueue = JSON.parse(SSprevQueue);
          const tmpQueue = [...prevQueue, received];
          sessionStorage.setItem("prevQueue", JSON.stringify(tmpQueue));
          setQueue(tmpQueue);
          break;
        case "online":
          setCounter(received.users);
          break;
      }
    });

    socket.addEventListener("close", e => {
      console.log("==========WebSocket Disconnected==========");
      setWSConnectionState("#ff0a37");
    });

    socket.addEventListener("error", e => {
      console.log("==========WebSocket Connection Error==========");
    });

    return () => socket.close();
  }, []);

  return null;
}

export default WSControl;