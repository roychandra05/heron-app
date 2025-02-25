import currencyFormatter from "@/lib/currencyFormatter";
import { Checkbox } from "../ui/checkbox";
import InputFormSales from "./InputFormSales";

const Tbody = ({
  data,
  rowSelect,
  rowEdit,
  setRowEdit,
  setIsLoading,
  user,
  actionButton,
  checkedBoxRow,
}) => {
  return (
    <tbody className="border-b-2">
      <tr className="text-center">
        <td className="">
          <p> {data.package}</p>
        </td>
        <td className="">
          <p> {data.price}</p>
        </td>
        <td className="">
          <p> {data.quantity}</p>
        </td>
        <td className="">
          <p> {currencyFormatter(data.total)}</p>
        </td>
        <td className="text-center lg:py-2 md:py-2 xl:py-2 2xl:py-2">
          <div className="flex flex-col gap-2 items-center justify-center">
            <Checkbox
              checked={rowSelect.includes(data.id) ? true : false}
              className="border-main-base"
              onCheckedChange={() => checkedBoxRow(data.id)}
            />
            {rowEdit.includes(data.id) && (
              <div className="fixed inset-0 z-20 rounded-lg">
                <div
                  className="absolute bg-main-background inset-0 z-20 opacity-30"
                  onClick={() => setRowEdit([])}
                ></div>
                <div className="bg-main-background absolute z-50 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[80%] border-2 rounded-lg 2xl:w-[50%] xl:w-[50%] lg:w-[50%] md:w-[60%] py-2">
                  <InputFormSales
                    setIsLoadingUpdate={setIsLoading}
                    setRowEdit={setRowEdit}
                    user={user}
                    prevData={data}
                    type={"edit sales"}
                    closeButton={true}
                  />
                </div>
              </div>
            )}
            <button
              disabled={rowEdit.includes(data.id)}
              className={`max-[640px]:px-1 border px-3 rounded-md font-semibold ${
                rowEdit.includes(data.id)
                  ? "bg-main-background text-main-base"
                  : "hover:bg-main-background hover:text-main-base bg-main-base text-main-background"
              }  transition-all duration-200`}
              onClick={() => {
                setRowEdit([data.id]);
              }}
            >
              {actionButton}
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
};
export default Tbody;
