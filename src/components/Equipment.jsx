import ImageItems from "./ImageItems";
import os_one from "../../public/images/os_one.jpg";
import os_two from "../../public/images/os_two.jpg";
import os_three from "../../public/images/os_three.jpg";
import os_four from "../../public/images/os_four.jpg";
import os_five from "../../public/images/os_five.jpg";
import os_six from "../../public/images/os_six.jpg";
import os_seven from "../../public/images/os_seven.jpg";
import os_eight from "../../public/images/os_eight.jpg";

const Equipment = () => {
  const imgs = [
    os_one,
    os_two,
    os_three,
    os_four,
    os_five,
    os_six,
    os_seven,
    os_eight,
  ];

  return (
    <section className="p-5 box-border">
      <div className="flex flex-col items-center justify-center gap-14 rounded-xl p-5 max-[640px]:px-0">
        <div className="flex items-center justify-center">
          <h1 className="max-[640px]:text-lg text-2xl font-bold">SPIRIT</h1>
        </div>
        <div className="flex flex-col gap-5 max-[640px]:gap-2">
          <div className="grid grid-cols-4 justify-center gap-4 max-[640px]:gap-2">
            <ImageItems imgs={imgs.slice(0, 4)} />
          </div>
          <div className="flex justify-center items-center gap-4 max-[640px]:gap-2">
            <ImageItems imgs={imgs.slice(4, 7)} />
          </div>
          <div className="flex justify-center items-center max-[640px]:gap-2">
            <ImageItems imgs={imgs.slice(7, 8)} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Equipment;
