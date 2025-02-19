const InputBmi = ({
  label,
  name,
  placeholder,
  onChange,
  value,
  isError,
}) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        onInput={onChange}
        name={name}
        type="string"
        id={name}
        placeholder={placeholder}
        className={`p-1 rounded-md focus:outline-main-background text-main-background ${isError ? 'border-red-600 focus:outline-red-500' : 'border-main-background'} border-2`}
        required
        inputMode="numeric"
        value={value}
      />
      {isError && <p className="text-red-600">{isError}</p>}
    </div>
  );
};
export default InputBmi;
