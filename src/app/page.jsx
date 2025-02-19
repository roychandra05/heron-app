import Sidebar from "@/components/Sidebar";
import CompanyProfile from "@/components/CompanyProfile";
import Galleries from "@/components/Galleries";
import Footer from "@/components/Footer";
import Equipment from "@/components/Equipment";
import OurServices from "@/components/OurServices";
import Welcome from "@/components/Welcome";
import img1 from "../../public/images/img-1.jpg";
import img2 from "../../public/images/img-2.jpg";
import img3 from "../../public/images/img-3.jpg";
import img4 from "../../public/images/img-4.jpg";
import galleriesData from "../../public/data/galleries.json";
import servicesData from "../../public/data/services.json";

import {
  Barbell,
  ClockClockwise,
  Headset,
  PersonArmsSpread,
} from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  const imgs = [img1, img2, img3, img4];

  return (
    <main className="flex">
      <Sidebar />
      <section className="w-full h-auto flex flex-col gap-3">
        <CompanyProfile />
        <Galleries imgs={imgs} galleriesData={galleriesData} />
        <Welcome />
        <Equipment />
        <section className="gap-5 p-4 max-[640px]:grid-cols-1 grid grid-cols-2 mt-10 h-auto">
          <OurServices services={servicesData.services}>
            <Barbell
              color="#fafafa"
              weight="duotone"
              className="w-[50%] h-[50%]"
            />
          </OurServices>
          <OurServices services={servicesData.trainer}>
            <PersonArmsSpread
              color="#fafafa"
              weight="duotone"
              className="w-[50%] h-[50%]"
            />
          </OurServices>
          <OurServices services={servicesData.operation}>
            <ClockClockwise
              color="#fafafa"
              weight="duotone"
              className="w-[50%] h-[50%]"
            />
          </OurServices>
          <OurServices services={servicesData.facilies}>
            <Headset
              color="#fafafa"
              weight="duotone"
              className="w-[50%] h-[50%]"
            />
          </OurServices>
        </section>
        <Footer />
      </section>
    </main>
  );
}
