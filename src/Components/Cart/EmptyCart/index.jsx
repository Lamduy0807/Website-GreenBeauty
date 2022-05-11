import React from "react";

const EmptyCart = () => {
  return (
    <div className="emptyCart">
      <div className="emptyCart__container">
        <div >
          Giỏ hàng
          <div>
            <img src="https://hasaki.vn/images/graphics/img_lb_empty.gif"></img>
            <div>Không có sản phẩm nào trong giỏ hàng của bạn</div>
            <button>Tiếp tục mua sắm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
