import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../Context/ModelContext/ModalContext";
import RatingProductComponent from "./RatingProductComponent";
const RatingProduct = () => {
  const { showRating, setShowRating,detailData, setDetailData } = useContext(ModalContext);
  
  return (
    <>
      {showRating ? (
        <div className="ratingpro">
          <div className="ratingpro__container">
              <h3 className="ratingpro__container__h3">Đánh giá sản phẩm</h3>
              <div className="ratingpro__content">
                  {
                    detailData.map((item,index)=>{
                      return(
                        <RatingProductComponent index={index} id={item.product} key={index}/>
                      )
                    })
                  }
              </div>
              <div className={detailData.length === 0? "rating__none" : "displaynone"} >
                  Bạn đã đánh giá tất cả sản phẩm trong đơn hàng này!
              </div>
              <div className="ratingpro__button">
                  <button onClick={()=>{setShowRating(prev=>!prev); setDetailData([])}} className="button orderCom__btngroup--active">Trở lại</button>
              </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RatingProduct;
