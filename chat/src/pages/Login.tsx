import LoginForm from '@/components/login/LoginForm';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <article className="flex align-middle justify-center w-full py-8">
        <h1 className="title">Join Chatroom</h1>
      </article>
      <article className="flex flex-grow">
        <LoginForm />
      </article>
    </div>
  );
}

export default Home;
