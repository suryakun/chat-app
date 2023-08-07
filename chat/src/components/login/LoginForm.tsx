import { useState } from "react";
import { login, CreateRoomInterface } from "@/services/room";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [userId, setUserId] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  
  const { mutateAsync } = useMutation(login, {
    onSuccess: () => {
      window.localStorage.setItem("userId", userId);
      window.localStorage.setItem("roomId", roomId);
      navigate(`/chat`);
    },
    onError: (error) => {
      alert(error);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync({ roomId, userId } as CreateRoomInterface);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between px-6 w-full">
      <div className="w-full">
        <input
          name="userId"
          className="login-input px-4 py-2 mb-4 w-full"
          min={5}
          max={50}
          required
          type="text"
          placeholder="Username"
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          name="roomId"
          className="login-input px-4 py-2 mb-4 w-full"
          min={1}
          max={50}
          required
          type="text"
          placeholder="RoomID"
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <button
        name="join"
        className="join px-8 py-2 justify-self-end mb-8"
        type="submit"
      >
        Join
      </button>
    </form>
  );
}

export default LoginForm;