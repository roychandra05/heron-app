import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";

const InputForm = ({
  form,
  name,
  label,
  type,
  isError,
  errorMessage,
  placeHolder
}) => {
  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                className={`${isError && "border-red-700"} border-2`}
                type={type ? type : "text"}
                placeholder={placeHolder}
                {...field}
              />
            </FormControl>
            <span className="px-2 font-semibold text-xs">
              {isError ? errorMessage : ""}
            </span>
          </FormItem>
        )}
      />
    </div>
  );
};
export default InputForm;
