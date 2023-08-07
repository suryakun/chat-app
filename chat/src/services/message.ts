export interface CreateMessageInterface {
  roomId: string;
  userId: string;
  message: string;
}

export interface MessageInterface {
  roomId: string;
  userId: string;
  message: string;
  timestamp: number;
}

export async function getMessages(roomId: string) {
  return await fetch(
    `${import.meta.env.VITE_API_HOST}/message/${roomId}`
  ).then(async (response) => {
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  });
}

export async function createMessage(data: CreateMessageInterface) {
  await fetch(`${import.meta.env.VITE_API_HOST}/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomId: data.roomId,
      userId: data.userId,
      message: data.message,
    }),
  }).then(async (response) => {
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  });
}
