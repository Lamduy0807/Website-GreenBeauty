import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="emptyCart">
      <div className="emptyCart__container">
        <div className="emptyCart__container--big" >
          Giỏ hàng
          <div >
            <img src="https://hasaki.vn/images/graphics/img_lb_empty.gif"></img>
            <div>Không có sản phẩm nào trong giỏ hàng của bạn</div>
            <Link to={'/'}>Tiếp tục mua sắm</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
