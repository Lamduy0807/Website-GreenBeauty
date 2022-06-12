import React from "react";
import { formatNumber } from "../../Function/Function";
const LoveProduct = (props) => {
  return (
    <div className="lp">
      <div className="lp__container">
        <div className="lp__name">
          <div className="lp__img">
            <img className="lp__img--img" src={props.imagepresent} />
          </div>
          <div className="lp__namecontent">
            <span className="lp__namecontent--brand">{props.brand}</span>
            <span className="lp__namecontent--name">{props.name}</span>
          </div>
        </div>
        <div className=" lp__status">
          {props.quantity > 0 ? (
            <div className="lp__status--success ">
              <i className="bx bx-check"></i>
              Còn hàng
            </div>
          ) : (
            <div className="lp__status--unsuccess">
              <i className="bx bx-x"></i>
              Hết hàng
            </div>
          )}
        </div>
        <div className="lp__price">
          {props.IsFlashsale ? (
            <div className="lp__price__sale">
              {formatNumber(props.priceSale+ "")}
              <span className="lp__price__d">đ</span>
            </div>
          ) : null}
          <div
            className={
              props.IsFlashsale
                ? "lp__price__main lp__price__main--strock"
                : "lp__price__main"
            }
          >
            {formatNumber(props.price+"")}
            <span className="lp__price__d">đ</span>
          </div>
        </div>
        <div className="lp__buttoncontent ">
          <div
            className={
              props.quantity > 0
                ? "lp__button lp__button--success"
                : "lp__button lp__button--unsuccess"
            }
          >
            Thêm vào giỏ hàng
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveProduct;
