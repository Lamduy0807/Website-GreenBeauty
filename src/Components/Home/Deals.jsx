import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import FlashSaleProduct from "./FlashSaleProduct";
import { getProduct } from "../../API/Networking";
import { settings } from "./SettingForSlider";
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
  return (
    <div className="deal">
      <div className="deal__container">
        <div className="deal__title">
          <div className="deal__title__left">
            <i className="bx bxs-zap smallSize"></i>
            <h2 className="deal__title__left--h2">Deals đang diễn ra</h2>
          </div>
          <div className="deal__title__right">
            <Link to={'/'} className="deal__title__right--btn">Xem tất cả</Link>
          </div>
        </div>
        <div className="deal__fl">
          <Slider {...settings}>
            {flProduct.map((item, index) => {
              return (
                <div key={index}>
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
