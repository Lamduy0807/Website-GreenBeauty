import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getProductRating } from "../../API/Networking";
const FlashSaleProduct = (props) => {
  const percent = 33;
  const [height, setHeight] = useState(0);
  const [maxStar, setMaxStar] = useState([1, 2, 3, 4, 5]);
  const [numberRating, setNumberRating] = useState(0);
  const [sumValue, setSumValue] = useState(0);

  const ref = useRef(null);
  useEffect(() => {
    setHeight(ref.current.clientHeight);
  }, []);

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
      <div className="fsp__card fsp__front" ref={ref}>
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
              {props.price}
              <div className="fsp__infor__price--currency">đ</div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="fsp__card fsp__back fsp__back__ground"
        style={{ height: height }}
      >
        <div className="fsp__back__content">
          <div className="fsp__back__content__cta">
            <p className="fsp__back__content__cta--avg">{props.brand}</p>
            <p className="fsp__back__content__cta--only">Chỉ còn</p>
            <p className="fsp__back__content__cta--value orange">
              {props.sale}
            </p>
            <p className="fsp__back__content__cta--only">
              ({numberRating})<br></br>
              <p className="fsp__back__content__cta--value orange">
                {maxStar.map((item, key) => {
                  return (
                    <i
                      class={
                        item <= sumValue / numberRating
                          ? "bx bxs-star"
                          : "bx bx-star"
                      }
                    ></i>
                  );
                })}
              </p>
            </p>

            <Link to={"/cart"} class="btn btn--white btn__animated">
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleProduct;
