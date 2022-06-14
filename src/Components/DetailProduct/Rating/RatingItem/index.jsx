import React, { useState, useEffect } from "react";
import { getUserInformation } from "../../../../API/Networking";
export const RatingItem = ({ item, name }) => {
  const maxStar = [1, 2, 3, 4, 5];
  const [user, setUser] = useState([]);
  useEffect(() => {
    try {
      console.log(item);
      const token = localStorage.getItem("token");
      getUserInformation(item.user, token).then((res) => {
        setUser(res);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className="product-rating">
      <div className="product-rating__main">
        <div className="product-rating__main__header">
          <div className="product-rating__main__header--right">
          <span className=" orange displayblock">
            {maxStar.map((it, key) => {
              return (
                <i
                  key={key}
                  className={
                    it <= item.ratingpoint ? "bx bxs-star" : "bx bx-star"
                  }
                ></i>
              );
            })}
          </span>
          <span className="product-rating__author-name">{user.name}</span>
          <span className="product-rating__name">{name}</span>
          </div>
          <div className="product-rating__time">{item.dayandtime.substring(11,16)} {item.dayandtime.substring(0,10)}</div>
        </div>

        <div className="product-rating__content">{item.ratingcomment}</div>
        <div>
          <img
            style={{ height: 80, width: 80 }}
            src={`http://127.0.0.1:8000${item.img}`}
            alt="image rating"
          />
        </div>
      </div>
    </div>
  );
};
