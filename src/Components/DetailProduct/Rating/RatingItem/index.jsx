import React, { useState, useEffect } from "react";

export const RatingItem = ({ item }) => {
  useEffect(() => {
    console.log("item: ", item);
  }, []);
  return (
    <div className="product-rating">
      <div>avt</div>
      <div className="product-rating__main">
        <a className="product-rating__author-name">{item.user} ThanhNgapy2k1</a>
        <div className="product-rating__time">dd/mm/yy 00:00</div>

        <div className="product-rating__content">{item.ratingcomment}</div>
        <div>
          <img
            style={{ height: 80, width: 80 }}
            src={
              "https://media.hasaki.vn/catalog/product/d/u/dung-dich-loai-bo-te-bao-chet-paula-s-choice-bha-2-30ml-2_img_80x80_d200c5_fit_center.jpg"
            }
            alt="image rating"
          />
        </div>
      </div>
    </div>
  );
};
