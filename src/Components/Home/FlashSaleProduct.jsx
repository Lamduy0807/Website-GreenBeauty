import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getProductRating } from "../../API/Networking";
import { formatNumber } from "../../Function/Function";


const FlashSaleProduct = (props) => {
  const maxStar = [1, 2, 3, 4, 5];
  const [numberRating, setNumberRating] = useState(0);
  const [sumValue, setSumValue] = useState(0);

  useEffect(() => {
    getProductRating(props.id).then((ratings) => {
      setNumberRating(ratings.length);
      ratings.forEach((rating) => {
        setSumValue((prov) => {
          return prov + rating.ratingpoint;
        });
      });
    });
  }, []);

  return (
    <div className="fsp">
      <div className="fsp__card fsp__front">
        <div className="fsp__front__img">
          <img className="fsp__front__img__image" src={props.src} />
          <div className="fsp__front__flag">
            <h3 className="fsp__front__flag__h3">
              -{(100 - (props.sale * 100) / props.price).toFixed()}%
            </h3>
          </div>
        </div>

        <div className="fsp__infor">
          <div className="fsp__infor__name">
            <h3 className="fsp__infor__h3">{props.name}</h3>
          </div>

          <div className="fsp__infor__content">
            <div className="fsp__infor__sale">
              {props.sale}
              <div className="fsp__infor__price--currency">đ</div>
            </div>
            <div className="fsp__infor__price">
              {/* {formatNumber(props.price)} */}
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(props.price)}
              {/* <div className="fsp__infor__price--currency">đ</div> */}
            </div>
          </div>
        </div>
      </div>

      <div
        className="fsp__card fsp__back fsp__back__ground"
        //style={{ height: height }}
      >
        <div className="fsp__back__content">
          <div className="fsp__back__content__cta">
            <span className="fsp__back__content__cta--avg displayblock">
              {props.brand}
            </span>
            <span className="fsp__back__content__cta--only displayblock">
              Chỉ còn
            </span>
            <span className="fsp__back__content__cta--value orange displayblock">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(props.sale)}
            </span>
            <span className="fsp__back__content__cta--only displayblock">
              ({numberRating})<br></br>
              <span className="fsp__back__content__cta--value orange displayblock">
                {maxStar.map((item, key) => {
                  return (
                    <i
                      key={key}
                      className={
                        item <= sumValue / numberRating
                          ? "bx bxs-star"
                          : "bx bx-star"
                      }
                    ></i>
                  );
                })}
              </span>
            </span>

            <Link to={"/cart"} className="btn btn--white btn__animated">
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleProduct;
