export interface CreateRoomInterface {
  roomId: string;
  userId: string;
}

export async function login(data: CreateRoomInterface) {
  await fetch(`${import.meta.env.VITE_API_HOST}/room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomId: data.roomId,
      userId: data.userId,
    }),
  }).then(async (response) => {
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  });
}

export async function logout(data: CreateRoomInterface) {
  await fetch(
    `${import.meta.env.VITE_API_HOST}/room/session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: data.roomId,
        userId: data.userId,
      }),
    }
  ).then(async (response) => {
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  });
}