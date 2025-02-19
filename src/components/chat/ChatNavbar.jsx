const ChatNavbar = ({ username }) => {
  return (
    <div className="w-full h-[7vh]  bg-main-background sticky top-0 flex items-start justify-center box-border">
      <h2 className="w-[20%] max-[640px]:w-[30%] h-full border-b-2 border-main-background bg-zinc-300 text-main-background p-2 flex items-center justify-center font-semibold">users added</h2>
      <h2 className="w-[80%] max-[640px]:w-[70%] h-full p-2 border-b-2 border-white flex items-center ">{username}</h2>
    </div>
  );
};
export default ChatNavbar;
