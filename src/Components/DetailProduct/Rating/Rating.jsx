import React, { useState, useEffect } from "react";
import { RatingItem } from "./RatingItem";
import { getListRating } from "../../../API/Server";

const Rating = (props) => {
  const [listRating, setListRating] = useState([]);

  const fetchAPIListRating = (id) => {
    getListRating(id)
      .then((result) => {
        setListRating(result);
      })
      .catch((error) => {
        console.log("Lỗi fetchAPIListRating trong chi tiết sản phẩm");
      });
  };

  useEffect(() => {
    fetchAPIListRating(props.id);
  }, []);
  return (
    <div className="rating">
      <h4 className="rating__header">ĐÁNH GIÁ SẢN PHẨM</h4>
      <div className="rating__overview">
        <div className="rating__overview__total">
          <div className="rating__overview__total__left">4.9/5.0</div>
          <div className="rating__overview__total__left">*****</div>
        </div>
        <div>
          <button className="rating__overview__total__right">Tất cả</button>
          <button className="rating__overview__total__right">5 sao</button>
          <button className="rating__overview__total__right">4 sao</button>
          <button className="rating__overview__total__right">3 sao</button>
          <button className="rating__overview__total__right">2 sao</button>
          <button className="rating__overview__total__right">1 sao</button>
        </div>
      </div>
      <div>
        {listRating.map((item, index) => (
          <RatingItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default Rating;
