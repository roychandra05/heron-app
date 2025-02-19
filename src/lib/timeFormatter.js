const dateOption = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const timeOption = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

const timeFormatter = (time) => {
  const format = new Date(time);
  const dateFormat = new Intl.DateTimeFormat("id-ID", dateOption).format(
    format
  );
  const timeFormat = new Intl.DateTimeFormat("id-ID", timeOption).format(
    format
  );
  return `${dateFormat}, ${timeFormat}`;
};
export default timeFormatter;
