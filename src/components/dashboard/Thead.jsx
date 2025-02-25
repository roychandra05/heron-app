const Thead = ({col1, col2, col3, col4, col5}) => {
  return (
    <thead>
      <tr className="border-b-2">
        <th scope="col" className="max-[640px]:px-1">
          <div className=" ">
            <p>{col1}</p>
          </div>
        </th>
        <th scope="col" className="max-[640px]:px-1">
          <div className="">
            <p>{col2}</p>
          </div>
        </th>
        <th scope="col" className="max-[640px]:px-1">
          <div className="">
            <p>{col3}</p>
          </div>
        </th>
        <th scope="col" className="max-[640px]:px-1">
          <div className="">
            <p>{col4}</p>
          </div>
        </th>
        <th scope="col" className="max-[640px]:px-1">
          <div className="">
            <p>{col5}</p>
          </div>
        </th>
      </tr>
    </thead>
  );
};
export default Thead;
