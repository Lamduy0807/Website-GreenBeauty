import React, { useState, useEffect } from "react";
import ButtonSlider from "./ButtonSlider";
import { getBanner } from "../../API/Networking";
import ListCategory from "./ListCategory";


const Banner = () => {
  useEffect(() => {
    GetData();
  }, []);

  const GetData = () => {
    getBanner().then((re) => {
      setBannerData(re);
    });
  };

  const [bannerData, setBannerData] = useState([]);
  const [current, setCurrent] = useState(0);
  const length = bannerData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  const moveDot = (index) => {
    setCurrent(index);
  };

  return (
    <div className="banner__container">
      <div className="banner">
        <div className="banner__slider">
          {bannerData.map((img, index) => {
            return (
              <div
                key={index}
                className={
                  index === current
                    ? "banner__slide active-anim"
                    : "banner__slide"
                }
              >
                {index === current && (
                  <img
                    className="banner__slide__img"
                    src={img.image}
                    alt={"banner" + index}
                    key={index}
                  />
                )}
              </div>
            );
          })}
          <ButtonSlider moveSlide={nextSlide} direction={"next"} />
          <ButtonSlider moveSlide={prevSlide} direction={"prev"} />
          <div className="banner__slider__dot">
            {bannerData.map((item, index) => {
              return (
                <div
                  onClick={() => moveDot(index)}
                  key={index}
                  className={
                    index === current
                      ? "banner__slider__dot-dot banner__slider__dot-dot-active"
                      : "banner__slider__dot-dot"
                  }
                ></div>
              );
            })}
          </div>
        </div>

        <div className="banner__smalling">
          <img
            className="banner__smalling__img"
            src={"https://media.hasaki.vn/hsk/1643178458nowfree_846x250-ct.jpg"}
            alt="bannersm1"
          />
          <img
            className="banner__smalling__img"
            src={"https://media.hasaki.vn/hsk/1643178458nowfree_846x250-ct.jpg"}
            alt="bannersm2"
          />
        </div>
      </div>
      {/* <ListCategory/> */}
    </div>
  );
};

export default Banner;
