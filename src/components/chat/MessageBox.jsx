import Message from "./Message";

const MessageBox = ({ messages, sender }) => {
  let prevWeekDay;
  return messages?.map((result, i) => {
    const weekday = result?.send_at?.split(", ")[0];
    const date = result?.send_at?.split(", ")[1];
    const time = result?.send_at?.split(", ")[2].slice(0, -3);
    const isWeekDay = weekday !== prevWeekDay;
    if (weekday) {
      prevWeekDay = weekday;
    }
    return (
      <div className="flex flex-col w-full" key={i}>
        {isWeekDay && (
          <div className="text-center">
            <div className="max-[640px]:text-[.8em]">{weekday}</div>
            <div className="max-[640px]:text-[.8em]">{date}</div>
          </div>
        )}
        <Message
          text={result?.sender_id === sender?.id && result.message}
          style={"flex text-end justify-end rounded-tl-lg"}
          preStyle={"rounded-tl-lg flex flex-col items-end"}
          isRead={result?.isRead}
          sender={sender?.id}
          time={time}
        />
        <Message
          text={result?.sender_id !== sender?.id && result?.message}
          preStyle={"rounded-tr-lg"}
          time={time}
        />
      </div>
    );
  });
};
export default MessageBox;
