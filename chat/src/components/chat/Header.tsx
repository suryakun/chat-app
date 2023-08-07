import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { CreateRoomInterface, logout } from '@/services/room';

function Header({ title }: { title: string }) {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(logout, {
    onSuccess: () => {
      window.localStorage.removeItem("userId");
      window.localStorage.removeItem("roomId");
      navigate(`/`);
    },
    onError: (error) => {
      console.log(error)
      alert(error);
    }
  });

  const handleExit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const roomId = window.localStorage.getItem("roomId");
    const userId = window.localStorage.getItem("userId");
    mutateAsync({ roomId, userId } as CreateRoomInterface);
  };

  return <article>
    <a onClick={handleExit} className="absolute top-5 left-4 text-green leading-9">Exit</a>
    <h1 className="title">{ title }</h1>
  </article>
}

export default Header;
