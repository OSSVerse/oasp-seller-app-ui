import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import "./latestnews.css";

const LatestNewsComp = () => {
  return (
    <div className="bg-secondary py-10">
      <div className=" page-root px-2 mx-auto items-center w-full grid md:grid-cols-2 gap-20 grid-cols-1">
        <div className=" md:text-start  space-y-5">
          <div className=" text-gray-500 font-semibold text-sm">
            Latest News
          </div>
          <div className="text-2xl font-semibold flex flex-col">
            <span> AI Solutions to Power Your</span>
            <span> Business Applications</span>
          </div>

          <div className="text-gray-500 text-sm">
            Enhance your AI capabilities with OSSVerse certified partner
            ecosystem, empowering seamless integration of your preferred AI/ML
            and application development tools on Red Hat infrastructure. Access
            comprehensive solutions for every stage of the AI pipeline.
          </div>
          <div>
            <Button>Learn More</Button>
          </div>
        </div>
        <div className=" flex justify-end">
          <img
            className=" object-cover h-96"
            src="https://images.unsplash.com/photo-1719937051124-91c677bc58fc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

const LatestNews = () => {
  const pagination = {
    clickable: true,
    renderBullet: (_: number, className: string) =>
      `<span class="${className}"></span>`,
  };

  return (
    <>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
        data-testid="swiper"
      >
        <SwiperSlide>
          <LatestNewsComp />
        </SwiperSlide>
        <SwiperSlide>
          <LatestNewsComp />
        </SwiperSlide>
        <SwiperSlide>
          <LatestNewsComp />
        </SwiperSlide>
        <SwiperSlide>
          <LatestNewsComp />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default LatestNews;
