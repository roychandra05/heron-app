const InputResetPassword = ({
  text,
  name,
  type,
  defaultValue,
  isError,
  errorMsg,
  isPending,
}) => {
  return (
    <div className="flex flex-col gap-1 relative max-[640px]:text-[.9em]">
      <label
        className="absolute -top-3 px-2 left-4 font-semibold bg-main-background"
        htmlFor={name}
      >
        {text}
      </label>
      <input
        autoFocus
        disabled={isPending}
        type={type}
        placeholder={name}
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={`${
          isError
            ? "border-red-600 focus:ring ring-red-600 ring-opacity-80 ring-offset-1 outline-none"
            : "border-white"
        } bg-main-background text-main-base border rounded-md px-3 py-4 transition-all duration-200`}
      />
      {isError && <p className="px-4 text-red-600">{errorMsg}</p>}
    </div>
  );
};
export default InputResetPassword;
