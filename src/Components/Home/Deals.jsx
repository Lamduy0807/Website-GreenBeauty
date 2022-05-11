import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import FlashSaleProduct from "./FlashSaleProduct";
import { getProduct } from "../../API/Networking";
const Deals = () => {
  const [flProduct, setFlProduct] = useState([]);
  useEffect(() => {
    GetData();
  }, []);

  const GetData = () => { 
    getProduct().then((re) => {
      re.forEach((item) => {
        if (item.IsFlashsale === true) {
          setFlProduct((prev) => [...prev, item]);
        }
      });
    });
  };
  console.log("product: ", flProduct);
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={"ButtonSlider next"} onClick={onClick}>
        <i class="bx bx-chevron-right"></i>
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={"ButtonSlider prev"} onClick={onClick}>
        <i class="bx bx-chevron-left"></i>
      </div>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="deal">
      <div className="deal__container">
        <div className="deal__title">
          <div className="deal__title__left">
            <i class="bx bxs-zap smallSize"></i>
            <h2 className="deal__title__left--h2">Deals đang diễn ra</h2>
          </div>
          <div className="deal__title__right">
            <Link className="deal__title__right--btn">Xem tất cả</Link>
          </div>
        </div>
        <div className="deal__fl">
          <Slider {...settings}>
            {flProduct.map((item, index) => {
              return (
                <div>
                  <FlashSaleProduct
                    name={item.name}
                    price={item.price}
                    sale={item.priceSale}
                    src={item.imagepresent}
                    brand={item.brand}
                    id={item.id}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Deals;
