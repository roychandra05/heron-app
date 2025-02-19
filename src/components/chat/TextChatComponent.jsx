import { PaperPlaneRight } from "@phosphor-icons/react/dist/ssr";

const TextChatComponent = ({ inputMessages, onSubmit, onChange }) => {
  return (
    <div className="flex w-full h-full gap-2">
      <div className="w-11/12 p-2 max-[640px]:text-sm">
        <textarea
          type="text"
          placeholder="message"
          className="resize-none w-full h-full p-1 rounded-lg text-main-background"
          onKeyDown={onChange}
          onChange={onChange}
          value={inputMessages}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          disabled={inputMessages ? false : true}
          type="submit"
          onClick={onSubmit}
          className={`${
            inputMessages && "hover:rotate-6"
          } -rotate-90 transition-all duration-300`}
        >
          <PaperPlaneRight className="max-[640px]:w-[2.5em] max-[640px]:h-[2.5em] w-[2em] h-[2em]" />
        </button>
      </div>
    </div>
  );
};
export default TextChatComponent;
