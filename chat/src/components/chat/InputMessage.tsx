import { useState } from "react";
import SendIcon from "../../assets/send.svg";
import { useMutation } from "react-query";
import { CreateMessageInterface, createMessage } from "@/services/message";

function InputMessage() {
  const [message, setMessage] = useState("");
  const { mutateAsync } = useMutation(createMessage, {
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomId = window.localStorage.getItem("roomId");
    const userId = window.localStorage.getItem("userId");
    mutateAsync({ roomId, userId, message } as CreateMessageInterface);
    setMessage("");
  };

  return (
    <div className="input-message py-8 px-4 ">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          name="message-input"
          className="login-input rounded-full py-3 px-3 w-full mr-1"
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>
          <img src={SendIcon} />
        </button>
      </form>
    </div>
  );
}

export default InputMessage;
