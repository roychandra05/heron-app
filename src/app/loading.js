import { Barbell } from "@phosphor-icons/react/dist/ssr";

const Loading = () => {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-14 h-14 animate-spin">
        <Barbell className="w-full h-full"/>
      </div>
    </section>
  );
};
export default Loading;
