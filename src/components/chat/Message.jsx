import { Check, Checks } from "@phosphor-icons/react";

const Message = ({ text, style, preStyle, time, isRead, sender }) => {
  return (
    <div className={`h-auto w-full ${style ? style : ""}`}>
      <div className={`${text && `w-3/4 ${preStyle}`}`}>
        <div
          className={`${
            text
              ? `w-fit px-2 py-1 rounded-b-lg ${preStyle} my-1 border-2 bg-zinc-800 whitespace-pre-wrap leading-none break-all`
              : ""
          }`}
        >
          {text}
          {text && (
            <div className="text-xs text-zinc-300 mt-1 flex gap-1 items-center ">
              <div className="">{time}</div>
              {sender ? (
                <div className="">
                  {isRead ? (
                    <Checks color="#00ff04" className="w-[150%] h-[150%]" />
                  ) : (
                    <Check color="#00ff04" className="w-full h-full" />
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Message;
