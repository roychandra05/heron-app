"use client";
import { useEffect, useState } from "react";
import { deleteSalesData } from "@/lib/actions";
import useLoading from "@/hooks/useLoading";
import Thead from "./Thead";
import Tbody from "./Tbody";
import Tfoot from "./Tfoot";
import { useUserSession } from "@/context/UserContext";
import PopUpMessage from "../PopUpMessage";

const TableSales = ({ datas }) => {
  const { user } = useUserSession();
  const [rowSelect, setRowSelect] = useState([]);
  const [rowEdit, setRowEdit] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [sortConfig, setSortCongif] = useState([]);
  const [sortMenu, setSortMenu] = useState(false);
  const [isLoading, setIsLoading] = useLoading("4000");
  const [limit, setLimit] = useState(5);

  const total = sortData
    .map((data) => data.total)
    .reduce((acc, curr) => acc + curr, 0);
  const checkedBoxRow = (id) => {
    setRowSelect((prev) => {
      if (prev.includes(id)) {
        return prev.filter((value) => value !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const deleteRow = async () => {
    const response = await deleteSalesData(rowSelect);
    if (!response.response.ok) {
      return;
    }
    setSortData((prev) => {
      if (rowSelect.length === 0) {
        return;
      } else {
        setRowSelect([]);
        return prev.filter((value) => !rowSelect.includes(value.id));
      }
    });
    setLimit((prev) => (prev = 5));
  };
  const sortBy = (value) => {
    let newSortData;
    setSortCongif((prev) => {
      if (prev.length === 0) {
        return [value];
      }
      if (prev.includes(value)) {
        return prev.filter((curr) => !curr.includes(value));
      } else return [...prev, value];
    });

    if (sortConfig.includes(value)) {
      if (value === "package") {
        newSortData = sortData.sort((a, b) => {
          let numA = parseInt(a[value]);
          let numB = parseInt(b[value]);
          return numA - numB;
        });
        setSortData(newSortData);
      } else {
        newSortData = sortData.sort((a, b) => a[value] - b[value]);
        setSortData(newSortData);
      }
    } else {
      if (value === "package") {
        newSortData = sortData.sort((a, b) => {
          let numA = parseInt(a[value]);
          let numB = parseInt(b[value]);
          return numB - numA;
        });
        setSortData(newSortData);
      } else {
        newSortData = sortData.sort((a, b) => b[value] - a[value]);
        setSortData(newSortData);
      }
    }
  };

  useEffect(() => {
    setSortData(datas);
  }, [datas]);

  useEffect(() => {
    if (rowEdit.length) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [rowEdit]);

  return (
    <section className="p-2 w-full h-auto flex flex-row-reverse gap-3">
      {isLoading && <PopUpMessage message={"Data has been updated"} />}
      <div
        className={`max-[640px]:text-[.5rem] flex flex-col w-[20%] items-center relative ${
          sortMenu ? "h-44" : "h-20"
        } transition-all duration-300`}
      >
        <button
          className="border py-1 w-full px-4 rounded-md absolute z-10 bg-black"
          onClick={() => setSortMenu(!sortMenu)}
        >
          Sort by
        </button>
        <div
          className={`flex flex-col w-full h-44 items-end transition-all duration-300 ${
            sortMenu ? "h-44" : "h-0"
          } `}
        >
          <button
            className={`border py-1 px-4 w-full rounded-md ${
              sortMenu ? "translate-y-8" : "-translate-y-0.1"
            } transition-all duration-300`}
            onClick={() => sortBy("package")}
          >
            Package
          </button>
          <button
            className={`border py-1 px-4 w-full rounded-md ${
              sortMenu ? "translate-y-8" : "-translate-y-[100%]"
            } transition-all duration-300`}
            onClick={() => sortBy("price")}
          >
            Price
          </button>
          <button
            className={`border py-1 px-4 w-full rounded-md ${
              sortMenu ? "translate-y-8" : "-translate-y-[200%]"
            } transition-all duration-300`}
            onClick={() => sortBy("quantity")}
          >
            Quantity
          </button>
          <button
            className={`border py-1 px-4 w-full rounded-md ${
              sortMenu ? "translate-y-8" : "-translate-y-[300%]"
            } transition-all duration-300`}
            onClick={() => sortBy("total")}
          >
            Total
          </button>
        </div>
      </div>
      <table className="w-full max-[640px]:text-[.5rem] sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base ">
        <Thead
          col1={"PACKAGE"}
          col2={"PRICE"}
          col3={"QUANTITY"}
          col4={"TOTAL"}
          col5={"CHECK"}
        />
        {sortData?.slice(limit - 5, limit).map((data, i) => {
          return (
            <Tbody
              key={data.id}
              data={data}
              rowEdit={rowEdit}
              rowSelect={rowSelect}
              setIsLoading={setIsLoading}
              setRowEdit={setRowEdit}
              user={user}
              actionButton={"EDIT"}
              checkedBoxRow={checkedBoxRow}
            />
          );
        })}
        <Tfoot
          colTitle1={"TOTAL"}
          actionButton={"DELETE"}
          deleteRow={deleteRow}
          limit={limit}
          rowSelect={rowSelect}
          setLimit={setLimit}
          sortData={sortData}
          total={total}
        />
      </table>
    </section>
  );
};
export default TableSales;
