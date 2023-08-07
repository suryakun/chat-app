import { useEffect } from "react";
import Header from "@/components/chat/Header";
import InputMessage from "@/components/chat/InputMessage";
import MessageList from "@/components/chat/MessageList";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = window.localStorage.getItem("userId") as string;
    const roomId = window.localStorage.getItem("roomId") as string;
    if (!userId || !roomId) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <article className="flex align-middle justify-center w-full py-5">
        <Header title="Chatroom" />
      </article>
      <MessageList />
      <article>
        <InputMessage />
      </article>
    </div>
  );
}

export default Chat;
