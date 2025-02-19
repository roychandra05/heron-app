import currencyFormatter from "@/lib/currencyFormatter";
import { ArrowFatLinesLeft, ArrowFatLinesRight } from "@phosphor-icons/react";

const Tfoot = ({
  colTitle1,
  actionButton,
  total,
  deleteRow,
  rowSelect,
  limit,
  setLimit,
  sortData,
}) => {
  console.info({ limit, sortData });
  return (
    <tfoot className="">
      <tr className="">
        <th colSpan="3">{colTitle1}</th>
        <td className="max-[640px]:px-1 px-3 text-center">
          {currencyFormatter(total)}
        </td>
        <td className="text-center py-2">
          <button
            onClick={deleteRow}
            disabled={rowSelect.length > 0 ? false : true}
            className={`border max-[640px]:px-1 px-3 rounded-md bg-main-base text-main-background font-semibold ${
              rowSelect.length > 0
                ? "hover:bg-main-background hover:text-main-base opacity-100"
                : "opacity-50"
            } transition-all duration-200`}
          >
            {actionButton}
          </button>
        </td>
      </tr>
      <tr>
        <td colSpan={"5"}>
          <div className="flex items-center justify-center gap-16 border-2 py-1 rounded-lg mt-3">
            <div>
              <button
                className={`${limit === 5 ? "opacity-50" : "opacity-100"}`}
                disabled={limit === 5 ? true : false}
                onClick={() =>
                  setLimit((prev) => {
                    let left = sortData.length % 5;
                    if (prev === sortData.length) {
                      if (left === 0) {
                        return prev - 5;
                      }
                      return prev - left;
                    }
                    return prev - 5;
                  })
                }
              >
                <ArrowFatLinesLeft className="max-[640px]:w-[3em] max-[640px]:h-[3em] h-[2.5em] w-[2.5em]" />
              </button>
            </div>
            <div>
              <h2 className="font-bold">{limit}</h2>
            </div>
            <div>
              <button
                className={`${
                  limit === sortData.length || limit > sortData.length
                    ? "opacity-50"
                    : "opacity-100"
                }`}
                disabled={
                  limit === sortData.length || limit > sortData.length
                    ? true
                    : false
                }
                onClick={() =>
                  setLimit((prev) => {
                    let left = sortData.length % 5;
                    if (limit + 5 > sortData.length) {
                      return prev + left;
                    }
                    return prev + 5;
                  })
                }
              >
                <ArrowFatLinesRight className="max-[640px]:w-[3em] max-[640px]:h-[3em] h-[2.5em] w-[2.5em]" />
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
};
export default Tfoot;
