import { useEffect, useRef } from "react";
import MessageReceive from "./MessageReceive";
import MessageSend from "./MessageSend";
import { useQuery, useQueryClient } from "react-query";
import { MessageInterface, getMessages } from "@/services/message";
import { socket } from "@/socket";

function MessageList() {
  const roomId = window.localStorage.getItem("roomId") as string;
  const userId = window.localStorage.getItem("userId") as string;
  const queryClient = useQueryClient();
  const listRef = useRef<HTMLDivElement>(null);
  const limitRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery<MessageInterface[]>(
    ["messages", roomId],
    () => getMessages(roomId as string),
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  useEffect(() => {
    function onConnect() {
      socket.emit("joinRoom", roomId);
    }

    function onJoinedRoom(value: string) {
      console.log("joined room", value);
      if (limitRef.current) {
        limitRef.current.scrollIntoView({});
      }
    }

    function onDisconnect() {
      console.log("disconnected");
    }

    function onEvent(value: MessageInterface) {
      queryClient.setQueryData<MessageInterface[]>(
        ["messages", roomId],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any) => {
          return data ? [...data, { ...value, timestamp: new Date() }] : data;
        }
      );
      console.log(listRef.current?.scrollHeight);
      // limitRef?.current?.scrollTo(listRef?.current?.scrollHeight as number, 0);
      setTimeout(() => {
        limitRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("joinedRoom", onJoinedRoom);
    socket.on("newMessage", onEvent);
    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("joinedRoom", onJoinedRoom);
      socket.off("newMessage", onEvent);
      socket.emit("leaveRoom", roomId);
      socket.disconnect();
    };
  }, [queryClient, roomId]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error.toString()}</div>;

  return (
    <article className="flex-grow justify-end overflow-auto h-1">
      <div ref={listRef}>
        {data?.map((item, index) => {
          return item.userId === userId ? (
            <MessageSend
              key={index}
              text={item.message}
              datetime={new Date(item.timestamp)}
            />
          ) : (
            <MessageReceive
              key={index}
              sender={item.userId}
              text={item.message}
              datetime={new Date(item.timestamp)}
            />
          );
        })}
      </div>
      <div id="limit" className="h-1 mt-8" ref={limitRef} />
    </article>
  );
}

export default MessageList;
